import React, { useRef, useEffect } from 'react';
import { gsap } from '../../lib/gsap';

interface TextRevealProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  className?: string;
  triggerHook?: boolean; // If true, triggers on scroll. If false, triggers immediately on mount with delay
  delay?: number;
  duration?: number;
  stagger?: number;
  id?: string;
}

export const TextReveal: React.FC<TextRevealProps> = ({
  text,
  as: Component = 'h2',
  className = '',
  triggerHook = true,
  delay = 0,
  duration = 0.95,
  stagger = 0.035,
  id,
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const words = text.split(' ');

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = gsap.context(() => {
      const wordSpans = gsap.utils.toArray<HTMLElement>('.text-reveal-inner');
      if (wordSpans.length === 0) return;

      const animProps: gsap.TweenVars = {
        y: '0%',
        opacity: 1,
        rotateX: 0,
        duration,
        stagger,
        ease: 'power3.out',
        delay,
        force3D: true,
      };

      if (triggerHook) {
        animProps.scrollTrigger = {
          trigger: containerRef.current,
          start: 'top 88%',
          toggleActions: 'play none none none',
        };
      }

      gsap.fromTo(
        wordSpans,
        {
          y: '115%',
          opacity: 0,
          rotateX: 18,
          transformOrigin: '50% 100%',
        },
        animProps
      );
    }, containerRef);

    return () => ctx.revert();
  }, [triggerHook, delay, duration, stagger]);

  return (
    <Component
      id={id}
      ref={containerRef as unknown as React.RefObject<HTMLHeadingElement>}
      className={`${className} [perspective:1000px]`}
    >
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-top mr-[0.26em] last:mr-0 pb-[0.14em]"
        >
          <span className="text-reveal-inner inline-block transform-gpu will-change-transform">
            {word}
          </span>
        </span>
      ))}
    </Component>
  );
};
