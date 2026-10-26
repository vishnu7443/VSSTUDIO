import React, { useRef, useEffect } from 'react';
import { MultiStepInquiryForm } from '../../components/inquiry/MultiStepInquiryForm';
import { Mail, Clock } from 'lucide-react';
import { StudioLogo } from '../../components/ui/StudioLogo';
import { gsap } from '../../lib/gsap';

export const ContactPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = gsap.context(() => {
      // Header intro
      gsap.fromTo(
        '.gsap-contact-header > *',
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, stagger: 0.12, ease: 'power3.out' }
      );

      // Left sidebar and right form entrance
      gsap.fromTo(
        '.gsap-contact-sidebar',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, delay: 0.2, ease: 'power3.out' }
      );

      gsap.fromTo(
        '.gsap-contact-form-wrapper',
        { y: 40, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 0.95, delay: 0.25, ease: 'power3.out' }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col">
      {/* Header */}
      <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-b border-sage/40 bg-paper">
        <div className="gsap-contact-header max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-mint text-forest text-xs font-medium border border-sage/60">
            <StudioLogo size="xs" variant="bare" />
            <span>Direct Studio Intake</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-forest tracking-tight">
            Start a project inquiry
          </h1>
          <p className="text-ink/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Complete the 4-step intake below. Your progress saves automatically as you type. Both studio founders review every submission within 24 hours.
          </p>
        </div>
      </section>

      {/* Main Form Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Context & Direct Contact Details */}
          <div className="gsap-contact-sidebar lg:col-span-4 space-y-6">
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-sage/60 space-y-4 shadow-xs">
              <h3 className="font-serif text-xl text-forest">
                What happens next?
              </h3>
              
              <ul className="space-y-4 text-xs sm:text-sm text-ink/80">
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-mint text-forest font-serif font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </span>
                  <div>
                    <span className="font-semibold text-forest block">Founder review</span>
                    <span className="text-ink/70">Vishnu Vardhan & Sriram review your brief and technical requirements.</span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-mint text-forest font-serif font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </span>
                  <div>
                    <span className="font-semibold text-forest block">Scope & proposal</span>
                    <span className="text-ink/70">We send a tailored proposal with exact deliverables, milestones, and INR pricing.</span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-mint text-forest font-serif font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </span>
                  <div>
                    <span className="font-semibold text-forest block">Sprint kickoff</span>
                    <span className="text-ink/70">Upon advance payment confirmation, we commence development immediately.</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Direct Studio Contact Box */}
            <div className="bg-mint/40 p-6 rounded-3xl border border-sage/60 space-y-3">
              <h4 className="font-serif text-base text-forest">
                Direct inquiries
              </h4>
              <p className="text-xs text-ink/80 leading-relaxed">
                Prefer email or have an urgent RFP? Feel free to reach out directly:
              </p>
              <div className="space-y-2 pt-1 text-xs">
                <a 
                  href="mailto:vsstudioai@gmail.com" 
                  className="flex items-center gap-2 text-forest font-medium hover:text-green transition-colors font-mono"
                >
                  <Mail className="w-4 h-4 text-green" />
                  <span>vsstudioai@gmail.com</span>
                </a>
                <div className="flex items-center gap-2 text-ink/70">
                  <Clock className="w-4 h-4 text-green" />
                  <span>Response SLA: Within 24 business hours</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: The Interactive Multi-step Form */}
          <div className="gsap-contact-form-wrapper lg:col-span-8">
            <MultiStepInquiryForm />
          </div>
        </div>
      </section>
    </div>
  );
};
