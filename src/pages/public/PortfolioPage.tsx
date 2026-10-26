import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Sparkles } from 'lucide-react';
import { PortfolioItem } from '../../types/inquiry';
import { gsap } from '../../lib/gsap';

const samplePortfolioData: PortfolioItem[] = [
  {
    id: '1',
    title: 'Aetheria Health Practice Portal',
    category: 'Web Design & Dev',
    description: 'A serene, high-accessibility patient intake platform and medical wellness brand redesign. Improved consultation booking conversions by 42%.',
    tags: ['React', 'Tailwind CSS', 'Supabase Auth', 'WCAG AA'],
    metrics: '42% increase in online bookings',
    isSample: true,
    year: '2025',
  },
  {
    id: '2',
    title: 'Forma Ceramic Studio & Atelier',
    category: 'Brand Identity',
    description: 'Complete visual identity, typographic guidelines, and bespoke packaging suite for an artisanal ceramic maker based in Bangalore.',
    tags: ['Brand Identity', 'Custom Wordmark', 'Packaging', 'Guidelines'],
    metrics: 'Featured in Design Collectives',
    isSample: true,
    year: '2024',
  },
  {
    id: '3',
    title: 'Lumina Intelligence Triage Agent',
    category: 'AI Automation',
    description: 'Automated inbound RFP evaluation system that scores leads, parses PDF attachments, and constructs founder-reviewed proposal drafts.',
    tags: ['Python Agent', 'Supabase Edge', 'Resend API', 'Webhooks'],
    metrics: 'Saves 14 founder hours weekly',
    isSample: true,
    year: '2025',
  },
  {
    id: '4',
    title: 'Kinetic Motion Architecture Lab',
    category: 'Web Design & Dev',
    description: 'Minimalist editorial showcase website for an urban architectural collective with fluid animations and responsive photo galleries.',
    tags: ['Vite', 'TypeScript', 'CSS Animation', 'Vercel'],
    metrics: '99/100 Google Lighthouse Score',
    isSample: true,
    year: '2024',
  },
  {
    id: '5',
    title: 'Verde Organics Supply Chain System',
    category: 'AI Automation',
    description: 'Inventory monitoring bot connected to vendor email alerts and Postgres database to alert founders on stock anomalies before stockouts.',
    tags: ['PostgreSQL Triggers', 'Scheduled Cron', 'Notification Pipeline'],
    metrics: 'Zero stockout events in 6 months',
    isSample: true,
    year: '2025',
  },
  {
    id: '6',
    title: 'Solstice Botanical Roasters',
    category: 'Brand Identity',
    description: 'Modern artisanal coffee roastery branding, earth-toned color hierarchy, eco-friendly bag labels, and custom iconography.',
    tags: ['Logo Marks', 'Color Matrix', 'Typography', 'Print Prep'],
    metrics: 'Sold out launch inventory',
    isSample: true,
    year: '2024',
  },
];

export const PortfolioPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const containerRef = useRef<HTMLDivElement>(null);

  const categories = ['All', 'Web Design & Dev', 'Brand Identity', 'AI Automation'];

  const filteredItems = activeFilter === 'All'
    ? samplePortfolioData
    : samplePortfolioData.filter((item) => item.category === activeFilter);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = gsap.context(() => {
      // Header intro
      gsap.fromTo(
        '.gsap-portfolio-header > *',
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, stagger: 0.12, ease: 'power3.out' }
      );

      // Grid items entrance
      gsap.fromTo(
        '.gsap-portfolio-grid-item',
        { y: 50, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.75,
          stagger: 0.12,
          ease: 'power3.out',
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [activeFilter]);

  return (
    <div ref={containerRef} className="flex flex-col">
      {/* Header */}
      <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-b border-sage/40 bg-paper">
        <div className="gsap-portfolio-header max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mint text-forest text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-green" />
            <span>Sample Portfolio & Real Studio Case Studies</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-forest tracking-tight">
            Selected studio work
          </h1>
          <p className="text-ink/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            A curated collection of web applications, distinct visual brand systems, and intelligent automated workflows.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                  activeFilter === cat
                    ? 'bg-forest text-white shadow-xs'
                    : 'bg-white border border-sage/60 text-forest hover:bg-mint/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Note about Sample Data */}
          <div className="mb-8 p-3.5 rounded-2xl bg-mint/50 border border-sage/60 flex items-center justify-between text-xs text-forest">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green" />
              <span>
                Demonstration note: Initial projects below are clearly marked as <strong>[Sample project]</strong> to showcase studio capabilities before live client release.
              </span>
            </div>
            <span className="hidden sm:inline-block text-ink/60">
              Supabase connected in Phase 2
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="gsap-portfolio-grid-item bg-white p-6 sm:p-7 rounded-3xl border border-sage/60 flex flex-col justify-between shadow-xs hover:border-green/60 transition-all group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full bg-mint text-forest text-xs font-semibold">
                      {item.category}
                    </span>
                    {item.isSample && (
                      <span className="px-2.5 py-0.5 rounded-full border border-sage text-ink/60 text-[10px] font-medium bg-paper">
                        Sample project
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-serif text-xl text-forest group-hover:text-green transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-ink/80 text-xs sm:text-sm leading-relaxed mt-2">
                      {item.description}
                    </p>
                  </div>

                  {item.metrics && (
                    <div className="p-2.5 rounded-xl bg-paper border border-sage/40 text-xs text-forest font-medium">
                      🎯 {item.metrics}
                    </div>
                  )}
                </div>

                <div className="pt-6 border-t border-sage/40 mt-6 space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-paper text-ink/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-xs text-ink/60 pt-1">
                    <span>Year: {item.year}</span>
                    <Link
                      to="/contact"
                      className="text-green font-medium hover:underline inline-flex items-center gap-1"
                    >
                      <span>Inquire similar</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Banner */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-forest text-white text-center">
        <div className="max-w-2xl mx-auto space-y-4">
          <h2 className="font-serif text-3xl text-white">
            Have a project in mind?
          </h2>
          <p className="text-white/80 text-sm sm:text-base">
            Every engagement starts with a direct conversation with both founders.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-green text-white font-medium text-sm hover:bg-green-dark active:scale-95 transition-all shadow-md"
            >
              <span>Submit your project brief</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
