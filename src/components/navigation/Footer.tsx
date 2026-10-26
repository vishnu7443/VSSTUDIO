import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { StudioLogo } from '../ui/StudioLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-forest text-white mt-auto border-t border-forest">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center">
              <StudioLogo size="md" inverted />
            </div>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed max-w-sm">
              An independent, two-founder design and engineering studio. We build bespoke websites, crafted brand identities, and autonomous AI agent workflows.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-sage">
              <span className="inline-block w-2 h-2 rounded-full bg-green animate-pulse" />
              <span>Available for selected Q4 / Q1 studio engagements</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-serif text-lg text-white">
              Studio
            </h4>
            <ul className="space-y-2.5 text-sm text-white/80">
              <li>
                <Link to="/services" className="hover:text-sage transition-colors">
                  Services & scopes
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-sage transition-colors">
                  Selected work
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-sage transition-colors">
                  About the founders
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-sage transition-colors">
                  Submit an inquiry
                </Link>
              </li>
            </ul>
          </div>

          {/* Core Practices */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-serif text-lg text-white">
              Core practices
            </h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sage" />
                <span>Website design & engineering</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sage" />
                <span>Logo & visual brand identity</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sage" />
                <span>AI agents & automation systems</span>
              </li>
            </ul>

            <div className="pt-4 flex flex-col gap-1.5">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-sm font-medium text-sage hover:text-white transition-colors underline underline-offset-4"
              >
                <span>Book direct consultation</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <a
                href="mailto:vsstudioai@gmail.com"
                className="text-xs text-sage/80 hover:text-white transition-colors font-mono"
              >
                vsstudioai@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/70">
          <p>© {new Date().getFullYear()}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/contact" className="hover:text-white transition-colors">
              Client inquiries
            </Link>
            <Link to="/about" className="hover:text-white transition-colors">
              Two-person studio
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
