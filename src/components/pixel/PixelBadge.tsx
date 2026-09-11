import React from 'react';

interface PixelBadgeProps {
  children: React.ReactNode;
  variant?: 'purple' | 'pink' | 'yellow' | 'cyan' | 'green' | 'muted';
  size?: 'sm' | 'md';
  onClick?: () => void;
  className?: string;
}

export const PixelBadge: React.FC<PixelBadgeProps> = ({
  children,
  variant = 'purple',
  size = 'md',
  onClick,
  className = '',
}) => {
  const variantStyles = {
    purple: 'bg-kirei-purple/15 text-kirei-purple-light border-kirei-purple/40 hover:border-kirei-purple/70',
    pink: 'bg-kirei-pink/15 text-kirei-pink-light border-kirei-pink/40 hover:border-kirei-pink/70',
    yellow: 'bg-kirei-yellow/15 text-kirei-yellow-light border-kirei-yellow/40 hover:border-kirei-yellow/70',
    cyan: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/40 hover:border-cyan-500/70',
    green: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40 hover:border-emerald-500/70',
    muted: 'bg-kirei-card text-kirei-text-secondary border-kirei-border hover:border-kirei-borderHighlight',
  };

  const sizeStyles = {
    sm: 'text-[10px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
  };

  return (
    <span
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 font-mono font-medium rounded border transition-all ${
        variantStyles[variant]
      } ${sizeStyles[size]} ${
        onClick ? 'cursor-pointer hover:scale-[1.02] active:scale-[0.98]' : ''
      } ${className}`}
    >
      {children}
    </span>
  );
};
