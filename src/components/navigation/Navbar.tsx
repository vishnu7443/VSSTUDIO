import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { StudioLogo } from '../ui/StudioLogo';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-paper/95 backdrop-blur-sm border-b border-sage/40 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link 
          to="/" 
          className="flex items-center group py-2"
          id="nav-logo"
          aria-label="Home"
        >
          <StudioLogo size="md" className="group-hover:scale-105 transition-transform" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              id={`nav-${link.name.toLowerCase()}`}
              className={`text-base font-medium transition-colors hover:text-green ${
                isActive(link.path)
                  ? 'text-green font-semibold underline underline-offset-8 decoration-2'
                  : 'text-ink/80'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/contact"
            id="nav-cta-inquiry"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-green text-white font-medium text-sm hover:bg-green-dark active:scale-95 transition-all shadow-sm"
          >
            <span>Start an inquiry</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden">
          <button
            type="button"
            id="nav-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-forest hover:bg-mint/60 transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div 
          id="nav-mobile-menu"
          className="md:hidden border-b border-sage/60 bg-paper px-4 pt-2 pb-6 space-y-3"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                isActive(link.path)
                  ? 'bg-mint text-forest font-semibold'
                  : 'text-ink/90 hover:bg-mint/40'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2">
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-full bg-green text-white font-medium text-base hover:bg-green-dark active:scale-95 transition-all text-center"
            >
              <span>Start an inquiry</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
