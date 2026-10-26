import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Zap, Users2 } from 'lucide-react';
import { StudioLogo } from '../../components/ui/StudioLogo';
import { gsap } from '../../lib/gsap';

export const AboutPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = gsap.context(() => {
      // Header intro
      gsap.fromTo(
        '.gsap-about-header > *',
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, stagger: 0.12, ease: 'power3.out' }
      );

      // Founders cards scroll reveal
      gsap.fromTo(
        '.gsap-founder-card',
        { y: 60, opacity: 0, scale: 0.97 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.95,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.gsap-founders-grid',
            start: 'top 82%',
          },
        }
      );

      // Principles cards
      gsap.fromTo(
        '.gsap-principle-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.16,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.gsap-principles-grid',
            start: 'top 82%',
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
        <div className="gsap-about-header max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-mint text-forest text-xs font-medium border border-sage/60">
            <StudioLogo size="xs" variant="bare" />
            <span>Independent Two-Person Studio</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-forest tracking-tight">
            Built by two founders who write code and design systems
          </h1>
          <p className="text-ink/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            We started this studio because small businesses and founders deserve the technical and visual quality of elite tech companies without agency bloat.
          </p>
        </div>
      </section>

      {/* The Two Founders */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold text-green uppercase tracking-wider">
              Studio Leadership
            </span>
            <h2 className="font-serif text-3xl text-forest mt-1">
              Meet the co-founders
            </h2>
          </div>

          <div className="gsap-founders-grid grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Founder 1: Vishnu Vardhan R G */}
            <div className="gsap-founder-card bg-white p-8 sm:p-10 rounded-3xl border border-sage/60 space-y-5 shadow-xs">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-mint border border-sage flex items-center justify-center font-serif text-2xl text-forest font-bold">
                  V
                </div>
                <div>
                  <h3 className="font-serif text-2xl text-forest">
                    Vishnu Vardhan R G
                  </h3>
                  <p className="text-xs font-semibold text-green uppercase tracking-wider">
                    Co-Founder • 3rd Year CSE
                  </p>
                </div>
              </div>

              <p className="text-ink/80 text-sm leading-relaxed">
                Third-year Computer Science & Engineering student and passionate hackathon enthusiast. Drives core engineering, full-stack application development, database architecture, and autonomous AI agent automation workflows.
              </p>

              <div className="pt-4 border-t border-sage/40 space-y-2 text-xs text-ink/70">
                <p className="font-semibold text-forest">Specialties & Focus:</p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2.5 py-1 rounded-full bg-paper text-ink/80">AI Agent Workflows</span>
                  <span className="px-2.5 py-1 rounded-full bg-paper text-ink/80">Full-Stack Architecture</span>
                  <span className="px-2.5 py-1 rounded-full bg-paper text-ink/80">React & Vite</span>
                  <span className="px-2.5 py-1 rounded-full bg-paper text-ink/80">Hackathon Builder</span>
                </div>
              </div>
            </div>

            {/* Founder 2: Sriram S */}
            <div className="gsap-founder-card bg-white p-8 sm:p-10 rounded-3xl border border-sage/60 space-y-5 shadow-xs">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-mint border border-sage flex items-center justify-center font-serif text-2xl text-forest font-bold">
                  S
                </div>
                <div>
                  <h3 className="font-serif text-2xl text-forest">
                    Sriram S
                  </h3>
                  <p className="text-xs font-semibold text-green uppercase tracking-wider">
                    Co-Founder • 2nd Year CSE
                  </p>
                </div>
              </div>

              <p className="text-ink/80 text-sm leading-relaxed">
                Second-year Computer Science & Engineering student and hackathon enthusiast. Leads visual brand design, logo design systems, typography pairings, and responsive frontend interfaces crafted for real-world impact.
              </p>

              <div className="pt-4 border-t border-sage/40 space-y-2 text-xs text-ink/70">
                <p className="font-semibold text-forest">Specialties & Focus:</p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2.5 py-1 rounded-full bg-paper text-ink/80">Brand Identity Systems</span>
                  <span className="px-2.5 py-1 rounded-full bg-paper text-ink/80">Logo Design</span>
                  <span className="px-2.5 py-1 rounded-full bg-paper text-ink/80">Frontend Engineering</span>
                  <span className="px-2.5 py-1 rounded-full bg-paper text-ink/80">Hackathon Builder</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Studio Working Principles */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-paper border-t border-sage/40">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-semibold text-green uppercase tracking-wider">
              Operating Philosophy
            </span>
            <h2 className="font-serif text-3xl text-forest mt-1">
              How we work with our clients
            </h2>
          </div>

          <div className="gsap-principles-grid grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="gsap-principle-card bg-white p-7 rounded-3xl border border-sage/60 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-mint flex items-center justify-center text-forest">
                <Users2 className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl text-forest">
                1. Direct partner access
              </h3>
              <p className="text-ink/80 text-xs sm:text-sm leading-relaxed">
                You work directly with Vishnu Vardhan and Sriram. No client reps, junior coordinators, or lost-in-translation handoffs.
              </p>
            </div>

            <div className="gsap-principle-card bg-white p-7 rounded-3xl border border-sage/60 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-mint flex items-center justify-center text-forest">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl text-forest">
                2. Sprint delivery
              </h3>
              <p className="text-ink/80 text-xs sm:text-sm leading-relaxed">
                We prefer 2 to 4 week focused sprints. We deploy functioning interactive software early rather than presenting 80-page slide decks.
              </p>
            </div>

            <div className="gsap-principle-card bg-white p-7 rounded-3xl border border-sage/60 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-mint flex items-center justify-center text-forest">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl text-forest">
                3. Built to own
              </h3>
              <p className="text-ink/80 text-xs sm:text-sm leading-relaxed">
                Zero proprietary lock-in. You own 100% of the code, Supabase database, vector assets, and brand design guidelines upon delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-forest text-white text-center">
        <div className="max-w-2xl mx-auto space-y-4">
          <h2 className="font-serif text-3xl text-white">
            Ready to collaborate with our founders?
          </h2>
          <p className="text-white/80 text-sm sm:text-base">
            We take on a limited number of clients per quarter to ensure focused attention.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-green text-white font-medium text-sm hover:bg-green-dark active:scale-95 transition-all shadow-md"
            >
              <span>Submit your project inquiry</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
