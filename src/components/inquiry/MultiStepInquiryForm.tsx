import React, { useState, useEffect } from 'react';
import { 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Upload, 
  Trash2, 
  FileText, 
  CheckCircle2, 
  Sparkles, 
  AlertCircle,
  Loader2
} from 'lucide-react';
import { InquiryFormData } from '../../types/inquiry';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';

const STORAGE_KEY = 'vs_inquiry_draft';
const ADMIN_MOCK_STORAGE_KEY = 'vs_studio_inquiries';

const initialFormData: InquiryFormData = {
  services: [],
  description: '',
  budgetRange: '',
  idealDeadline: '',
  referenceLinks: '',
  files: [],
  clientName: '',
  clientEmail: '',
  clientCompany: '',
  honeypot: '',
};

export const MultiStepInquiryForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<InquiryFormData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : initialFormData;
    } catch {
      return initialFormData;
    }
  });

  const [rawFiles, setRawFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Sync to local storage for saved progress
  useEffect(() => {
    if (!isSuccess) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    }
  }, [formData, isSuccess]);

  const serviceOptions = [
    'Website design & development',
    'Logo & brand design',
    'AI agents & workflow automation',
  ];

  const budgetOptions = [
    '₹50,000 – ₹1,00,000',
    '₹1,00,000 – ₹2,50,000',
    '₹2,50,000 – ₹5,00,000',
    '₹5,00,000+',
  ];

  const deadlineOptions = [
    'Under 2 weeks (Rush)',
    '1 month',
    '2 – 3 months',
    'Flexible timeline',
  ];

  const mapServiceType = (services: string[]): string => {
    if (services.some((s) => s.toLowerCase().includes('web'))) return 'website_design_dev';
    if (services.some((s) => s.toLowerCase().includes('logo') || s.toLowerCase().includes('brand'))) return 'logo_branding';
    if (services.some((s) => s.toLowerCase().includes('ai') || s.toLowerCase().includes('automation'))) return 'ai_agents_automation';
    return 'website_design_dev';
  };

  const toggleService = (service: string) => {
    setFormData((prev) => {
      const exists = prev.services.includes(service);
      const updated = exists 
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service];
      return { ...prev, services: updated };
    });
    if (errors.services) {
      setErrors((prev) => ({ ...prev, services: '' }));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = e.target.files;
    if (!uploadedFiles || uploadedFiles.length === 0) return;

    const filesArray = Array.from(uploadedFiles);
    const newFileMeta = filesArray.map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type || 'application/octet-stream',
    }));

    setRawFiles((prev) => [...prev, ...filesArray]);
    setFormData((prev) => ({
      ...prev,
      files: [...prev.files, ...newFileMeta],
    }));
  };

  const removeFile = (index: number) => {
    setRawFiles((prev) => prev.filter((_, i) => i !== index));
    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }));
  };

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (formData.services.length === 0) {
        newErrors.services = 'Please select at least one service.';
      }
      if (!formData.description.trim() || formData.description.trim().length < 10) {
        newErrors.description = 'Please provide a project description (at least 10 characters).';
      }
    } else if (currentStep === 2) {
      if (!formData.budgetRange) {
        newErrors.budgetRange = 'Please select your target budget bracket.';
      }
      if (!formData.idealDeadline) {
        newErrors.idealDeadline = 'Please select an ideal target deadline.';
      }
    } else if (currentStep === 4) {
      if (!formData.clientName.trim()) {
        newErrors.clientName = 'Please enter your name.';
      }
      if (!formData.clientEmail.trim()) {
        newErrors.clientEmail = 'Please enter your email.';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.clientEmail)) {
        newErrors.clientEmail = 'Please provide a valid email address.';
      }
      if (!formData.clientCompany.trim()) {
        newErrors.clientCompany = 'Please enter your company or brand name.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setErrors({});
    setSubmitError(null);
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    // Honeypot anti-spam check
    if (formData.honeypot) {
      console.warn('Bot submission blocked via honeypot.');
      return;
    }

    if (!validateStep(4)) return;

    setIsSubmitting(true);

    try {
      const uploadedFilePaths: string[] = [];
      const serviceType = mapServiceType(formData.services);
      const fullRequirements = `Services: ${formData.services.join(', ')}\n\nProject Scope:\n${formData.description.trim()}`;

      // 1. Upload files to private Supabase Storage bucket 'client-files' if configured
      if (isSupabaseConfigured && rawFiles.length > 0) {
        for (const file of rawFiles) {
          const sanitized = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
          const filePath = `inquiries/${Date.now()}-${Math.random().toString(36).substring(7)}-${sanitized}`;

          const { error: uploadError } = await supabase.storage
            .from('client-files')
            .upload(filePath, file);

          if (!uploadError) {
            uploadedFilePaths.push(filePath);
          } else {
            console.warn('File storage upload warning (continuing with inquiry):', uploadError);
          }
        }
      }

      // 2. Submit to Supabase public.inquiries table
      if (isSupabaseConfigured) {
        const { error: insertError } = await supabase.from('inquiries').insert([
          {
            name: formData.clientName.trim(),
            email: formData.clientEmail.trim().toLowerCase(),
            phone: null,
            company: formData.clientCompany.trim() || null,
            service_type: serviceType,
            requirements: fullRequirements,
            budget_range: formData.budgetRange,
            deadline: formData.idealDeadline || null,
            reference_links: formData.referenceLinks.trim() || null,
            file_urls: uploadedFilePaths,
            status: 'new',
          },
        ]);

        if (insertError) {
          throw new Error(`Database error: ${insertError.message}`);
        }
      }

      // 3. Also update local storage mock feed so admin dashboard can sync immediately in dev/local mode
      try {
        const stored = localStorage.getItem(ADMIN_MOCK_STORAGE_KEY);
        const existingInquiries = stored ? JSON.parse(stored) : [];
        const newLocalRecord = {
          id: `inq-${Date.now()}`,
          name: formData.clientName.trim(),
          email: formData.clientEmail.trim().toLowerCase(),
          phone: null,
          company: formData.clientCompany.trim() || null,
          service_type: serviceType,
          requirements: fullRequirements,
          budget_range: formData.budgetRange,
          deadline: formData.idealDeadline || null,
          reference_links: formData.referenceLinks.trim() || null,
          file_urls: uploadedFilePaths.length > 0 ? uploadedFilePaths : formData.files.map((f) => f.name),
          status: 'new',
          assigned_to: null,
          notes: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        localStorage.setItem(
          ADMIN_MOCK_STORAGE_KEY,
          JSON.stringify([newLocalRecord, ...existingInquiries])
        );
      } catch {
        // Ignore local storage error
      }

      // Cleanup
      localStorage.removeItem(STORAGE_KEY);
      setRawFiles([]);
      setIsSuccess(true);
    } catch (err: unknown) {
      console.error('Inquiry submission error:', err);
      const msg = err instanceof Error ? err.message : 'Failed to transmit inquiry to server.';
      setSubmitError(`${msg} You can also email us directly at vsstudioai@gmail.com.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setRawFiles([]);
    setIsSuccess(false);
    setSubmitError(null);
    setStep(1);
    setErrors({});
  };

  const progressPercentage = (step / 4) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl border border-sage/60 p-6 sm:p-10 shadow-sm relative overflow-hidden">
      {/* Step Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs text-ink/70 font-medium mb-2">
          <span>Step {step} of 4</span>
          <span>{progressPercentage}% completed</span>
        </div>
        <div className="w-full h-2 bg-mint rounded-full overflow-hidden">
          <div 
            className="h-full bg-green transition-all duration-500 ease-out rounded-full"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Success State */}
      {isSuccess ? (
        <div className="py-8 text-center space-y-6 animate-slide-up">
          <div className="w-16 h-16 mx-auto rounded-full bg-mint border border-green flex items-center justify-center text-green animate-pop-tick shadow-sm">
            <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
          </div>

          <div className="space-y-2">
            <h3 className="font-serif text-2xl sm:text-3xl text-forest">
              Inquiry received
            </h3>
            <p className="text-ink/80 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
              Thank you, {formData.clientName}. Both studio founders (Vishnu Vardhan & Sriram) have been notified in our management dashboard. We review all submissions within 24 business hours.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-mint/50 border border-sage/50 text-left text-xs sm:text-sm text-forest space-y-1.5 max-w-md mx-auto">
            <p className="font-medium">Summary of submission:</p>
            <p className="text-ink/80">• Services: {formData.services.join(', ')}</p>
            <p className="text-ink/80">• Budget bracket: {formData.budgetRange}</p>
            <p className="text-ink/80">• Target launch: {formData.idealDeadline}</p>
            <p className="text-ink/80">• Contact email: {formData.clientEmail}</p>
            {formData.files.length > 0 && (
              <p className="text-ink/80">• Attachments: {formData.files.length} file(s) attached</p>
            )}
          </div>

          <button
            type="button"
            onClick={resetForm}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-forest text-white text-sm font-medium hover:bg-forest/90 active:scale-95 transition-all"
          >
            Submit another inquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          {/* Honeypot field (hidden from genuine users) */}
          <input
            type="text"
            name="website_catch"
            value={formData.honeypot}
            onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          {/* STEP 1: Services & Description */}
          {step === 1 && (
            <div className="space-y-6 animate-slide-up" key="step-1">
              <div>
                <h3 className="font-serif text-2xl text-forest mb-1">
                  What can we build for you?
                </h3>
                <p className="text-ink/70 text-sm">
                  Select all services you require for this engagement.
                </p>
              </div>

              {/* Service Selection Pills */}
              <div className="space-y-2.5">
                <label className="block text-xs font-semibold text-ink/80">
                  Services needed
                </label>
                <div className="grid grid-cols-1 gap-2.5">
                  {serviceOptions.map((service) => {
                    const isSelected = formData.services.includes(service);
                    return (
                      <button
                        type="button"
                        key={service}
                        onClick={() => toggleService(service)}
                        className={`flex items-center justify-between p-3.5 rounded-xl border text-sm font-medium text-left transition-all ${
                          isSelected
                            ? 'bg-mint border-green text-forest shadow-xs'
                            : 'bg-white border-sage/60 text-ink/80 hover:bg-mint/30'
                        }`}
                      >
                        <span>{service}</span>
                        {isSelected && (
                          <span className="w-5 h-5 rounded-full bg-green text-white flex items-center justify-center">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
                {errors.services && (
                  <p className="text-xs text-forest font-medium flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.services}</span>
                  </p>
                )}
              </div>

              {/* Project Description */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="inquiry-description" className="block text-xs font-semibold text-ink/80">
                    Project summary
                  </label>
                  <span className="text-[11px] text-ink/60">
                    {formData.description.length} chars
                  </span>
                </div>
                <textarea
                  id="inquiry-description"
                  rows={4}
                  value={formData.description}
                  onChange={(e) => {
                    setFormData({ ...formData, description: e.target.value });
                    if (errors.description) setErrors({ ...errors, description: '' });
                  }}
                  placeholder="Tell us about your brand, current challenges, and core goals..."
                  className="w-full px-4 py-3 rounded-xl border border-sage/60 bg-paper focus:bg-white focus:outline-hidden focus:border-green text-sm text-ink transition-colors resize-none placeholder:text-ink/40"
                />
                {errors.description && (
                  <p className="text-xs text-forest font-medium flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.description}</span>
                  </p>
                )}
              </div>
            </div>
          )}

          {/* STEP 2: Budget & Deadline */}
          {step === 2 && (
            <div className="space-y-6 animate-slide-up" key="step-2">
              <div>
                <h3 className="font-serif text-2xl text-forest mb-1">
                  Budget bracket & ideal timeline
                </h3>
                <p className="text-ink/70 text-sm">
                  Transparent scopes allow us to assemble the right workflow.
                </p>
              </div>

              {/* Budget Radios */}
              <div className="space-y-2.5">
                <label className="block text-xs font-semibold text-ink/80">
                  Target investment (INR)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {budgetOptions.map((budget) => {
                    const isSelected = formData.budgetRange === budget;
                    return (
                      <button
                        type="button"
                        key={budget}
                        onClick={() => {
                          setFormData({ ...formData, budgetRange: budget });
                          if (errors.budgetRange) setErrors({ ...errors, budgetRange: '' });
                        }}
                        className={`p-3.5 rounded-xl border text-sm font-medium text-left transition-all ${
                          isSelected
                            ? 'bg-mint border-green text-forest font-semibold shadow-xs'
                            : 'bg-white border-sage/60 text-ink/80 hover:bg-mint/30'
                        }`}
                      >
                        {budget}
                      </button>
                    );
                  })}
                </div>
                {errors.budgetRange && (
                  <p className="text-xs text-forest font-medium flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.budgetRange}</span>
                  </p>
                )}
              </div>

              {/* Deadline Radios */}
              <div className="space-y-2.5">
                <label className="block text-xs font-semibold text-ink/80">
                  Target launch deadline
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {deadlineOptions.map((deadline) => {
                    const isSelected = formData.idealDeadline === deadline;
                    return (
                      <button
                        type="button"
                        key={deadline}
                        onClick={() => {
                          setFormData({ ...formData, idealDeadline: deadline });
                          if (errors.idealDeadline) setErrors({ ...errors, idealDeadline: '' });
                        }}
                        className={`p-3.5 rounded-xl border text-sm font-medium text-left transition-all ${
                          isSelected
                            ? 'bg-mint border-green text-forest font-semibold shadow-xs'
                            : 'bg-white border-sage/60 text-ink/80 hover:bg-mint/30'
                        }`}
                      >
                        {deadline}
                      </button>
                    );
                  })}
                </div>
                {errors.idealDeadline && (
                  <p className="text-xs text-forest font-medium flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.idealDeadline}</span>
                  </p>
                )}
              </div>
            </div>
          )}

          {/* STEP 3: Reference Links & Files */}
          {step === 3 && (
            <div className="space-y-6 animate-slide-up" key="step-3">
              <div>
                <h3 className="font-serif text-2xl text-forest mb-1">
                  References & assets
                </h3>
                <p className="text-ink/70 text-sm">
                  Optional: share inspiration links, Figma files, or brand docs.
                </p>
              </div>

              {/* Reference Links Input */}
              <div className="space-y-2">
                <label htmlFor="inquiry-references" className="block text-xs font-semibold text-ink/80">
                  Reference URLs / Inspirations
                </label>
                <input
                  id="inquiry-references"
                  type="text"
                  value={formData.referenceLinks}
                  onChange={(e) => setFormData({ ...formData, referenceLinks: e.target.value })}
                  placeholder="https://example.com, https://figma.com/..."
                  className="w-full px-4 py-3 rounded-xl border border-sage/60 bg-paper focus:bg-white focus:outline-hidden focus:border-green text-sm text-ink transition-colors placeholder:text-ink/40"
                />
              </div>

              {/* File Dropzone */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-ink/80">
                  Attach files (PDF, PNG, JPG, WEBP, ZIP — up to 10MB)
                </label>
                <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-sage rounded-2xl bg-paper/60 hover:bg-mint/30 cursor-pointer transition-colors group">
                  <Upload className="w-6 h-6 text-green group-hover:scale-110 transition-transform mb-2" />
                  <span className="text-sm font-medium text-forest">
                    Click or drag files to upload
                  </span>
                  <span className="text-xs text-ink/60 mt-1">
                    Documents, logos or brief files
                  </span>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    accept=".pdf,.png,.jpg,.jpeg,.webp,.zip"
                  />
                </label>

                {/* Uploaded File List */}
                {formData.files.length > 0 && (
                  <div className="space-y-2 mt-3">
                    {formData.files.map((file, idx) => (
                      <div 
                        key={idx}
                        className="flex items-center justify-between p-2.5 px-3 rounded-xl bg-mint/50 border border-sage/40 text-xs"
                      >
                        <div className="flex items-center gap-2 overflow-hidden">
                          <FileText className="w-4 h-4 text-green shrink-0" />
                          <span className="truncate text-forest font-medium">{file.name}</span>
                          <span className="text-ink/50 text-[10px]">
                            ({(file.size / 1024).toFixed(0)} KB)
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(idx)}
                          className="text-forest hover:text-green p-1 transition-colors"
                          aria-label={`Remove ${file.name}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 4: Name, Email, Company */}
          {step === 4 && (
            <div className="space-y-6 animate-slide-up" key="step-4">
              <div>
                <h3 className="font-serif text-2xl text-forest mb-1">
                  How should we reach you?
                </h3>
                <p className="text-ink/70 text-sm">
                  We'll send our response and direct proposal directly to your inbox.
                </p>
              </div>

              <div className="space-y-4">
                {/* Name */}
                <div className="space-y-1.5">
                  <label htmlFor="inquiry-name" className="block text-xs font-semibold text-ink/80">
                    Full name
                  </label>
                  <input
                    id="inquiry-name"
                    type="text"
                    value={formData.clientName}
                    onChange={(e) => {
                      setFormData({ ...formData, clientName: e.target.value });
                      if (errors.clientName) setErrors({ ...errors, clientName: '' });
                    }}
                    placeholder="e.g. Sathi Kumar"
                    className="w-full px-4 py-3 rounded-xl border border-sage/60 bg-paper focus:bg-white focus:outline-hidden focus:border-green text-sm text-ink transition-colors placeholder:text-ink/40"
                  />
                  {errors.clientName && (
                    <p className="text-xs text-forest font-medium flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.clientName}</span>
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="inquiry-email" className="block text-xs font-semibold text-ink/80">
                    Work email
                  </label>
                  <input
                    id="inquiry-email"
                    type="email"
                    value={formData.clientEmail}
                    onChange={(e) => {
                      setFormData({ ...formData, clientEmail: e.target.value });
                      if (errors.clientEmail) setErrors({ ...errors, clientEmail: '' });
                    }}
                    placeholder="you@company.com"
                    className="w-full px-4 py-3 rounded-xl border border-sage/60 bg-paper focus:bg-white focus:outline-hidden focus:border-green text-sm text-ink transition-colors placeholder:text-ink/40"
                  />
                  {errors.clientEmail && (
                    <p className="text-xs text-forest font-medium flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.clientEmail}</span>
                    </p>
                  )}
                </div>

                {/* Company */}
                <div className="space-y-1.5">
                  <label htmlFor="inquiry-company" className="block text-xs font-semibold text-ink/80">
                    Company or project name
                  </label>
                  <input
                    id="inquiry-company"
                    type="text"
                    value={formData.clientCompany}
                    onChange={(e) => {
                      setFormData({ ...formData, clientCompany: e.target.value });
                      if (errors.clientCompany) setErrors({ ...errors, clientCompany: '' });
                    }}
                    placeholder="Acme Studio / Project Nova"
                    className="w-full px-4 py-3 rounded-xl border border-sage/60 bg-paper focus:bg-white focus:outline-hidden focus:border-green text-sm text-ink transition-colors placeholder:text-ink/40"
                  />
                  {errors.clientCompany && (
                    <p className="text-xs text-forest font-medium flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.clientCompany}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Error Banner if any */}
              {submitError && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>{submitError}</span>
                </div>
              )}

              <div className="p-3.5 rounded-xl bg-mint/40 border border-sage/50 text-xs text-forest flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-green shrink-0 mt-0.5" />
                <span>
                  Your draft is auto-saved locally. Submitting transmits directly to our management dashboard for immediate review.
                </span>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="mt-8 pt-6 border-t border-sage/40 flex items-center justify-between gap-4">
            {step > 1 ? (
              <button
                type="button"
                id="inquiry-prev-button"
                onClick={prevStep}
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-sage text-forest hover:bg-mint/40 active:scale-95 text-sm font-medium transition-all disabled:opacity-50"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <button
                type="button"
                id="inquiry-next-button"
                onClick={nextStep}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-green text-white hover:bg-green-dark active:scale-95 text-sm font-medium transition-all shadow-sm"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                id="inquiry-submit-button"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-green text-white hover:bg-green-dark active:scale-95 text-sm font-medium transition-all shadow-sm disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Transmitting brief...</span>
                  </>
                ) : (
                  <>
                    <span>Submit inquiry</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
};
