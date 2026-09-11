import React from 'react';

interface PixelSparkleProps {
  color?: 'purple' | 'pink' | 'yellow' | 'cyan';
  size?: number;
  className?: string;
}

export const PixelSparkle: React.FC<PixelSparkleProps> = ({
  color = 'yellow',
  size = 16,
  className = '',
}) => {
  const colorMap = {
    yellow: '#FBBF24',
    pink: '#EC4899',
    purple: '#8B5CF6',
    cyan: '#06B6D4',
  };

  const c = colorMap[color];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block animate-sparkle ${className}`}
      style={{ imageRendering: 'pixelated' }}
    >
      <rect x="7" y="2" width="2" height="2" fill={c} />
      <rect x="5" y="4" width="6" height="2" fill={c} />
      <rect x="2" y="7" width="12" height="2" fill={c} />
      <rect x="5" y="10" width="6" height="2" fill={c} />
      <rect x="7" y="12" width="2" height="2" fill={c} />
      <rect x="7" y="7" width="2" height="2" fill="#FFFFFF" />
    </svg>
  );
};
