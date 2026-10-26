import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Code2, Palette, Cpu, Check, ArrowRight } from 'lucide-react';
import { gsap } from '../../lib/gsap';

export const ServicesPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const services = [
    {
      id: 'web-engineering',
      icon: Code2,
      title: 'Website design & development',
      badge: 'Core practice',
      summary: 'High-speed, conversion-focused websites engineered with modern React, Tailwind CSS, and headless backends. Clean code, zero bloat.',
      deliverables: [
        'Custom responsive UI/UX design (desktop, tablet, mobile)',
        'React / Next.js / Vite clean frontend architecture',
        'Database & API integration (Supabase, Postgres)',
        'Content management setup & self-serve client handoff',
        'Lighthouse performance score 95+ and SEO optimization',
        'WCAG AA accessible markup & semantic HTML',
      ],
      timeline: '2 – 4 weeks',
      startingPrice: '₹75,000',
    },
    {
      id: 'brand-identity',
      icon: Palette,
      title: 'Logo & brand design',
      badge: 'Visual identity',
      summary: 'Strategic visual identities built to endure. We craft memorable marks, distinctive typography systems, and cohesive design tokens.',
      deliverables: [
        'Primary vector logo mark, secondary variants, and submarks',
        'Curated color palettes with accessibility contrast matrices',
        'Typography pairings and licensed font recommendations',
        'Social media kits, favicons, and vector asset library',
        'Brand guideline document (PDF) for team consistency',
        'Print-ready stationery and collateral templates',
      ],
      timeline: '2 – 3 weeks',
      startingPrice: '₹50,000',
    },
    {
      id: 'ai-agents',
      icon: Cpu,
      title: 'AI agents & workflow automation',
      badge: 'Operational scale',
      summary: 'Autonomous AI pipelines that eliminate repetitive operations. From lead qualification to automated content engines and client onboarding.',
      deliverables: [
        'Custom autonomous AI agent system architecture',
        'Inbound inquiry triage & automated RFP response drafting',
        'CRM synchronization & transactional email triggers (Resend)',
        'Supabase Edge Functions & webhook pipeline integrations',
        'Document parsing, extraction, and vector embedding workflows',
        'Testing, safety guardrails, and monitoring logging',
      ],
      timeline: '3 – 5 weeks',
      startingPrice: '₹90,000',
    },
  ];

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = gsap.context(() => {
      // Header intro
      gsap.fromTo(
        '.gsap-services-header > *',
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, stagger: 0.12, ease: 'power3.out' }
      );

      // Service blocks scroll reveal
      gsap.fromTo(
        '.gsap-service-block',
        { y: 65, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          stagger: 0.22,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.gsap-services-list',
            start: 'top 82%',
          },
        }
      );

      // Bottom banner
      gsap.fromTo(
        '.gsap-services-cta > *',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.14,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.gsap-services-cta',
            start: 'top 85%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col">
      {/* Header */}
      <section className="pt-16 pb-14 px-4 sm:px-6 lg:px-8 border-b border-sage/40 bg-paper">
        <div className="gsap-services-header max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mint text-forest text-xs font-medium">
            <span>Specialized Studio Offerings</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-forest tracking-tight">
            Services tailored for modern small businesses
          </h1>
          <p className="text-ink/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            We don't do everything. We focus exclusively on what we do at an exceptional level: clean web engineering, timeless branding, and AI workflow automation.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="gsap-services-list py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-12">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                id={service.id}
                className="gsap-service-block bg-white p-8 sm:p-12 rounded-3xl border border-sage/60 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start shadow-xs hover:border-green/50 transition-colors"
              >
                {/* Left Overview */}
                <div className="lg:col-span-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-mint flex items-center justify-center text-forest">
                      <Icon className="w-6 h-6 stroke-[1.8]" />
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-mint text-forest">
                      {service.badge}
                    </span>
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl text-forest">
                    {service.title}
                  </h2>

                  <p className="text-ink/80 text-sm sm:text-base leading-relaxed">
                    {service.summary}
                  </p>

                  <div className="pt-4 flex items-center gap-6 text-xs text-ink/70">
                    <div>
                      <span className="block font-semibold text-forest">Typical timeline</span>
                      <span>{service.timeline}</span>
                    </div>
                    <div className="border-l border-sage pl-6">
                      <span className="block font-semibold text-forest">Starting investment</span>
                      <span className="text-green font-semibold">{service.startingPrice}</span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-green text-white text-sm font-medium hover:bg-green-dark active:scale-95 transition-all shadow-sm"
                    >
                      <span>Inquire about this service</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* Right Deliverables */}
                <div className="lg:col-span-6 bg-paper/70 p-6 rounded-2xl border border-sage/40 space-y-3">
                  <h3 className="font-serif text-base text-forest">
                    What is included in the scope:
                  </h3>
                  <ul className="space-y-2.5">
                    {service.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-ink/80 leading-snug">
                        <span className="w-4 h-4 rounded-full bg-mint flex items-center justify-center text-green shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="gsap-services-cta py-16 px-4 sm:px-6 lg:px-8 bg-forest text-white text-center">
        <div className="max-w-2xl mx-auto space-y-4">
          <h2 className="font-serif text-3xl text-white">
            Need a custom combination?
          </h2>
          <p className="text-white/80 text-sm sm:text-base">
            Many clients engage us for both Brand Identity and Web Engineering, or bundle AI automations with their existing site.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-green text-white font-medium text-sm hover:bg-green-dark active:scale-95 transition-all shadow-md"
            >
              <span>Discuss a combined proposal</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
