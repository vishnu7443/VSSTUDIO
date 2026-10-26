import React, { useRef, useEffect } from 'react';
import { gsap } from '../../lib/gsap';

export const HeroCircles: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftCircleRef = useRef<HTMLDivElement>(null);
  const rightCircleRef = useRef<HTMLDivElement>(null);
  const centerPillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect user's reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = gsap.context(() => {
      // Intro entrance for geometric shapes
      gsap.fromTo(
        [leftCircleRef.current, rightCircleRef.current],
        { scale: 0.6, opacity: 0 },
        { scale: 1, opacity: 0.75, duration: 1.8, ease: 'power2.out', stagger: 0.2 }
      );

      // Continuous smooth ambient drift
      gsap.to(leftCircleRef.current, {
        x: '+=35',
        y: '-=25',
        rotation: 10,
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to(rightCircleRef.current, {
        x: '-=30',
        y: '+=25',
        rotation: -12,
        duration: 11,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Subtle ScrollTrigger parallax drift on page scroll
      if (containerRef.current) {
        gsap.to(leftCircleRef.current, {
          y: -80,
          x: -40,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
        });

        gsap.to(rightCircleRef.current, {
          y: -60,
          x: 50,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center -z-10 select-none"
      aria-hidden="true"
    >
      <div className="relative w-full max-w-4xl h-[420px] sm:h-[500px]">
        {/* Left Circle (V node) */}
        <div 
          ref={leftCircleRef}
          className="absolute left-1/4 -top-6 w-64 h-64 sm:w-88 sm:h-88 rounded-full bg-mint border border-sage/40 opacity-70 mix-blend-multiply"
          style={{ width: 'clamp(240px, 32vw, 380px)', height: 'clamp(240px, 32vw, 380px)' }}
        />
        {/* Right Circle (S node) */}
        <div 
          ref={rightCircleRef}
          className="absolute right-1/4 top-14 w-60 h-60 sm:w-80 sm:h-80 rounded-full bg-sage/35 border border-sage/60 opacity-80 mix-blend-multiply"
          style={{ width: 'clamp(210px, 28vw, 340px)', height: 'clamp(210px, 28vw, 340px)' }}
        />
        {/* Center intersection accent pill */}
        <div 
          ref={centerPillRef}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-16 rounded-full bg-mint/50 border border-green/20 opacity-60"
        />
      </div>
    </div>
  );
};
