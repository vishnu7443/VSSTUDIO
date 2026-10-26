import React from 'react';

interface StudioLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  variant?: 'circle' | 'bare';
  inverted?: boolean;
}

export const StudioLogo: React.FC<StudioLogoProps> = ({
  size = 'md',
  className = '',
  variant = 'bare',
  inverted = false,
}) => {
  const sizeMap = {
    xs: 'h-4 w-auto max-h-4',
    sm: 'h-6 w-auto max-h-6',
    md: 'h-8 w-auto max-h-8',
    lg: 'h-12 w-auto max-h-12',
    xl: 'h-20 w-auto max-h-20',
  };

  const badgeSizeMap = {
    xs: 'w-7 h-7',
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-28 h-28',
  };

  const logoSrc = inverted ? '/logo-white.png' : '/logo.png';

  if (variant === 'circle') {
    return (
      <div
        className={`rounded-full flex items-center justify-center shrink-0 transition-all ${
          inverted
            ? 'bg-white/10 border border-white/20'
            : 'bg-mint/80 border border-sage/60 hover:border-green'
        } ${badgeSizeMap[size]} ${className}`}
      >
        <img
          src={logoSrc}
          alt="VS Studio Emblem"
          className={`object-contain ${sizeMap[size]} select-none`}
        />
      </div>
    );
  }

  return (
    <img
      src={logoSrc}
      alt="VS Studio Emblem"
      className={`object-contain shrink-0 select-none ${sizeMap[size]} ${className}`}
    />
  );
};
