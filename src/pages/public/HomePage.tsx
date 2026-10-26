import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowUpRight, 
  Code2, 
  Palette, 
  Cpu, 
  ArrowRight
} from 'lucide-react';
import { HeroCircles } from '../../components/motion/HeroCircles';
import { TextReveal } from '../../components/motion/TextReveal';
import { StudioLogo } from '../../components/ui/StudioLogo';
import { gsap } from '../../lib/gsap';

export const HomePage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = gsap.context(() => {
      // 1. HERO INTRO SEQUENCE
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      heroTl
        .fromTo(
          '.gsap-hero-badge',
          { y: -24, opacity: 0, scale: 0.94 },
          { y: 0, opacity: 1, scale: 1, duration: 0.75, delay: 0.1 }
        )
        .fromTo(
          '.gsap-hero-sub',
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.85 },
          '+=0.15'
        )
        .fromTo(
          '.gsap-hero-actions > *',
          { y: 22, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 0.75, stagger: 0.12 },
          '-=0.45'
        )
        .fromTo(
          '.gsap-hero-metric',
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.75, stagger: 0.14 },
          '-=0.4'
        );

      // 2. SECTION 2: DISCIPLINES SCROLLTRIGGER
      gsap.fromTo(
        ['.gsap-disciplines-eyebrow', '.gsap-disciplines-desc'],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.gsap-disciplines-section',
            start: 'top 85%',
          },
        }
      );

      gsap.fromTo(
        '.gsap-discipline-tile',
        { y: 65, opacity: 0, scale: 0.97 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.95,
          stagger: 0.18,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.gsap-discipline-tile',
            start: 'top 85%',
          },
        }
      );

      // 3. SECTION 3: PORTFOLIO SHOWCASE SCROLLTRIGGER
      gsap.fromTo(
        ['.gsap-portfolio-eyebrow', '.gsap-portfolio-link'],
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.gsap-portfolio-section',
            start: 'top 85%',
          },
        }
      );

      gsap.fromTo(
        '.gsap-portfolio-card',
        { y: 60, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.gsap-portfolio-card',
            start: 'top 85%',
          },
        }
      );

      // 4. SECTION 4: TWO FOUNDERS PHILOSOPHY SCROLLTRIGGER
      gsap.fromTo(
        '.gsap-founders-card',
        { y: 55, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.gsap-founders-section',
            start: 'top 82%',
          },
        }
      );

      // 5. SECTION 5: CONTACT BANNER SCROLLTRIGGER
      gsap.fromTo(
        ['.gsap-contact-badge', '.gsap-contact-desc', '.gsap-contact-cta'],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.gsap-contact-banner',
            start: 'top 85%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col">
      {/* 1. HERO SECTION */}
      <section className="relative pt-16 pb-20 sm:pt-24 sm:pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <HeroCircles />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Studio Badge */}
          <div className="gsap-hero-badge inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-mint border border-sage/60 text-xs text-forest font-medium mb-6 shadow-xs">
            <StudioLogo size="xs" variant="bare" />
            <span>Independent two-founder design & engineering studio</span>
          </div>

          {/* Headline Text Reveal */}
          <TextReveal
            as="h1"
            text="Bespoke websites, visual brands, and autonomous AI agents."
            className="font-serif text-4xl sm:text-6xl lg:text-7xl text-forest tracking-tight leading-[1.08] mb-6"
            triggerHook={false}
            delay={0.2}
            duration={0.95}
            stagger={0.035}
          />

          {/* Subheading */}
          <p className="gsap-hero-sub text-base sm:text-xl text-ink/80 max-w-2xl mx-auto leading-relaxed mb-10">
            We partner directly with ambitious founders to engineer fast modern web systems, distinct brand identities, and intelligent workflows.
          </p>

          {/* Primary Action Buttons */}
          <div className="gsap-hero-actions flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              id="hero-cta-inquiry"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-green text-white font-medium text-base hover:bg-green-dark active:scale-95 transition-all shadow-sm"
            >
              <span>Start an inquiry</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/services"
              id="hero-cta-services"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white border border-sage text-forest font-medium text-base hover:bg-mint/40 active:scale-95 transition-all"
            >
              <span>Explore services</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Trust metric pills */}
          <div className="mt-14 pt-8 border-t border-sage/40 grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-2xl mx-auto text-left">
            <div className="gsap-hero-metric">
              <p className="font-serif text-2xl sm:text-3xl text-forest">2</p>
              <p className="text-xs text-ink/70 mt-1">Dedicated senior founders on every project</p>
            </div>
            <div className="gsap-hero-metric">
              <p className="font-serif text-2xl sm:text-3xl text-forest">100%</p>
              <p className="text-xs text-ink/70 mt-1">Direct communication with no account managers</p>
            </div>
            <div className="gsap-hero-metric col-span-2 sm:col-span-1">
              <p className="font-serif text-2xl sm:text-3xl text-forest">2–4 wks</p>
              <p className="text-xs text-ink/70 mt-1">Typical sprint delivery from kickoff to launch</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE THREE DISCIPLINES (VARYING SHAPES) */}
      <section className="gsap-disciplines-section py-20 px-4 sm:px-6 lg:px-8 bg-paper">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-12">
            <span className="gsap-disciplines-eyebrow inline-block text-xs font-semibold text-green uppercase tracking-wider mb-2">
              Core Studio Capabilities
            </span>
            <TextReveal
              as="h2"
              text="Crafted with purpose, engineered for speed"
              className="font-serif text-3xl sm:text-4xl text-forest mt-1 mb-3"
            />
            <p className="gsap-disciplines-desc text-ink/80 text-base leading-relaxed">
              We do not outsource or dilute our craft. Every client works directly with both founders across our three core pillars.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tile 1: Web Design & Dev (Asymmetric Radius) */}
            <div className="gsap-discipline-tile bg-white p-8 border border-sage/60 rounded-[2.5rem] rounded-tr-md flex flex-col justify-between shadow-xs hover:border-green/60 transition-colors">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-mint flex items-center justify-center text-forest">
                  <Code2 className="w-6 h-6 stroke-[1.8]" />
                </div>
                <h3 className="font-serif text-2xl text-forest">
                  Website design & engineering
                </h3>
                <p className="text-ink/80 text-sm leading-relaxed">
                  Fast, accessible web applications and editorial marketing sites built on modern frameworks with clean semantic code and smooth responsive layouts.
                </p>
              </div>

              <div className="pt-8 border-t border-sage/40 mt-6 space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[11px] px-2.5 py-1 rounded-full bg-mint text-forest font-medium">React & Next.js</span>
                  <span className="text-[11px] px-2.5 py-1 rounded-full bg-mint text-forest font-medium">Tailwind CSS</span>
                  <span className="text-[11px] px-2.5 py-1 rounded-full bg-mint text-forest font-medium">Performance 95+</span>
                </div>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-green hover:underline pt-2"
                >
                  <span>Learn more</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Tile 2: Logo and Brand Design (Pill Bottom Corner) */}
            <div className="gsap-discipline-tile bg-white p-8 border border-sage/60 rounded-[2.5rem] rounded-bl-md flex flex-col justify-between shadow-xs hover:border-green/60 transition-colors">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-mint flex items-center justify-center text-forest">
                  <Palette className="w-6 h-6 stroke-[1.8]" />
                </div>
                <h3 className="font-serif text-2xl text-forest">
                  Logo & brand identity
                </h3>
                <p className="text-ink/80 text-sm leading-relaxed">
                  Distinct visual systems, custom typography pairings, design tokens, and comprehensive brand guidelines tailored for growing companies.
                </p>
              </div>

              <div className="pt-8 border-t border-sage/40 mt-6 space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[11px] px-2.5 py-1 rounded-full bg-mint text-forest font-medium">Vector Logo Marks</span>
                  <span className="text-[11px] px-2.5 py-1 rounded-full bg-mint text-forest font-medium">Color Palettes</span>
                  <span className="text-[11px] px-2.5 py-1 rounded-full bg-mint text-forest font-medium">Guidelines</span>
                </div>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-green hover:underline pt-2"
                >
                  <span>Learn more</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Tile 3: AI Agents & Automation (Rounded Opposite Diagonal) */}
            <div className="gsap-discipline-tile bg-white p-8 border border-sage/60 rounded-[2.5rem] rounded-tl-md flex flex-col justify-between shadow-xs hover:border-green/60 transition-colors">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-mint flex items-center justify-center text-forest">
                  <Cpu className="w-6 h-6 stroke-[1.8]" />
                </div>
                <h3 className="font-serif text-2xl text-forest">
                  AI agents & automation
                </h3>
                <p className="text-ink/80 text-sm leading-relaxed">
                  Autonomous agent workflows, CRM and email automations, customer inquiry parsing, and custom API bridges that eliminate manual operational drag.
                </p>
              </div>

              <div className="pt-8 border-t border-sage/40 mt-6 space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[11px] px-2.5 py-1 rounded-full bg-mint text-forest font-medium">LLM Integrations</span>
                  <span className="text-[11px] px-2.5 py-1 rounded-full bg-mint text-forest font-medium">Webhook Pipelines</span>
                  <span className="text-[11px] px-2.5 py-1 rounded-full bg-mint text-forest font-medium">Supabase Edge</span>
                </div>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-green hover:underline pt-2"
                >
                  <span>Learn more</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SELECTED WORK PREVIEW (SAMPLE DATA CLEARLY MARKED) */}
      <section className="gsap-portfolio-section py-20 px-4 sm:px-6 lg:px-8 bg-mint/40 border-y border-sage/40">
        <div className="max-w-6xl mx-auto">
          <div className="gsap-portfolio-header flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="gsap-portfolio-eyebrow inline-block text-xs font-semibold text-green uppercase tracking-wider mb-1">
                Portfolio Showcase
              </span>
              <TextReveal
                as="h2"
                text="Recent studio projects"
                className="font-serif text-3xl sm:text-4xl text-forest mt-1"
              />
            </div>
            <Link
              to="/portfolio"
              className="gsap-portfolio-link inline-flex items-center gap-1.5 text-sm font-medium text-forest hover:text-green transition-colors"
            >
              <span>View all portfolio items</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Project 1 */}
            <div className="gsap-portfolio-card bg-white p-7 rounded-3xl border border-sage/60 space-y-5">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-mint text-forest text-xs font-medium">
                  Web Design & Dev
                </span>
                <span className="px-2.5 py-0.5 rounded-full border border-sage text-ink/70 text-[11px] font-medium">
                  Sample project
                </span>
              </div>
              <h3 className="font-serif text-2xl text-forest">
                Aetheria Health Clinic Platform
              </h3>
              <p className="text-ink/80 text-sm leading-relaxed">
                Full redesign and booking portal for a medical wellness practice, achieving 40% faster appointment scheduling and sub-second load times.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="text-xs text-ink/60 bg-paper px-2.5 py-1 rounded-lg">React</span>
                <span className="text-xs text-ink/60 bg-paper px-2.5 py-1 rounded-lg">Tailwind</span>
                <span className="text-xs text-ink/60 bg-paper px-2.5 py-1 rounded-lg">Supabase</span>
              </div>
            </div>

            {/* Project 2 */}
            <div className="gsap-portfolio-card bg-white p-7 rounded-3xl border border-sage/60 space-y-5">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-mint text-forest text-xs font-medium">
                  AI Automation
                </span>
                <span className="px-2.5 py-0.5 rounded-full border border-sage text-ink/70 text-[11px] font-medium">
                  Sample project
                </span>
              </div>
              <h3 className="font-serif text-2xl text-forest">
                Lumina Intelligence Inquiry Bot
              </h3>
              <p className="text-ink/80 text-sm leading-relaxed">
                Autonomous inbound triage pipeline that parses client RFPs, validates budget thresholds, and automatically drafts tailored founder proposals.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="text-xs text-ink/60 bg-paper px-2.5 py-1 rounded-lg">Python AI Agent</span>
                <span className="text-xs text-ink/60 bg-paper px-2.5 py-1 rounded-lg">Webhooks</span>
                <span className="text-xs text-ink/60 bg-paper px-2.5 py-1 rounded-lg">Resend</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE TWO FOUNDERS NOTE */}
      <section className="gsap-founders-section py-20 px-4 sm:px-6 lg:px-8">
        <div className="gsap-founders-card max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-3xl border border-sage/60">
          <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center">
            <StudioLogo size="lg" variant="circle" className="shadow-xs shrink-0" />
            <div className="space-y-3">
              <span className="text-xs font-semibold text-green uppercase tracking-wider">
                Founder Philosophy
              </span>
              <TextReveal
                as="h3"
                text="No middle managers, no agency overhead."
                className="font-serif text-2xl sm:text-3xl text-forest"
              />
              <p className="text-ink/80 text-sm sm:text-base leading-relaxed">
                Our studio is run directly by Vishnu Vardhan (3rd year CSE) and Sriram (2nd year CSE)—hackathon builders with deep expertise across modern web development, brand identity systems, and autonomous AI agents. When you engage us, you collaborate directly with the builders.
              </p>
              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-1 text-sm font-medium text-forest hover:text-green underline underline-offset-4"
                >
                  <span>Read our story and background</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DEEP FOREST CONTACT SECTION (WCAG AA Compliant) */}
      <section className="gsap-contact-banner py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-forest text-white">
        <div className="gsap-contact-content max-w-4xl mx-auto text-center space-y-6">
          <span className="gsap-contact-badge inline-block px-3 py-1 rounded-full bg-green text-white text-xs font-medium">
            Ready to build together?
          </span>
          <TextReveal
            as="h2"
            text="Let's start your next chapter."
            className="font-serif text-3xl sm:text-5xl text-white tracking-tight"
          />
          <p className="gsap-contact-desc text-white/80 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Tell us about your project goals. Complete our simple 4-step inquiry form to receive a structured scope and proposal.
          </p>
          <div className="gsap-contact-cta pt-4">
            <Link
              to="/contact"
              id="footer-banner-inquiry"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-green text-white font-medium text-base hover:bg-green-dark active:scale-95 transition-all shadow-md"
            >
              <span>Submit project inquiry</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
