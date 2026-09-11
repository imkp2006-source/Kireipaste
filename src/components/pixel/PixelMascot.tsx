import React from 'react';

export type MascotState = 'idle' | 'detecting' | 'cleaning' | 'clean';

interface PixelMascotProps {
  state?: MascotState;
  size?: 'sm' | 'md' | 'lg';
  showSpeechBubble?: boolean;
  speechText?: string;
  onClick?: () => void;
  className?: string;
}

export const PixelMascot: React.FC<PixelMascotProps> = ({
  state = 'idle',
  size = 'md',
  showSpeechBubble = false,
  speechText,
  onClick,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  const getAnimation = () => {
    switch (state) {
      case 'cleaning':
        return 'animate-bounce';
      case 'detecting':
        return 'animate-pulse';
      case 'clean':
        return 'animate-float';
      default:
        return 'hover:-translate-y-1 transition-transform duration-200';
    }
  };

  return (
    <div className={`relative inline-flex items-center group cursor-pointer ${className}`} onClick={onClick}>
      {/* Speech bubble if enabled */}
      {showSpeechBubble && speechText && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-kirei-panel border-2 border-kirei-purple text-xs font-mono px-2.5 py-1 rounded shadow-pixel-solid text-kirei-yellow animate-fade-in z-20">
          {speechText}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 bg-kirei-panel border-b-2 border-r-2 border-kirei-purple rotate-45" />
        </div>
      )}

      {/* SVG Pixel Mascot (Hōki-chan: Pixel Broom with cute eyes & magic sparkles) */}
      <div className={`${sizeClasses[size]} ${getAnimation()} filter drop-shadow-[0_0_8px_rgba(236,72,153,0.35)]`}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          style={{ imageRendering: 'pixelated' }}
        >
          {/* Wood Handle */}
          <rect x="16" y="2" width="2" height="2" fill="#FBBF24" />
          <rect x="14" y="4" width="2" height="2" fill="#FBBF24" />
          <rect x="12" y="6" width="2" height="2" fill="#F59E0B" />
          <rect x="10" y="8" width="2" height="2" fill="#D97706" />

          {/* Ribbon / Headband */}
          <rect x="8" y="10" width="3" height="2" fill="#EC4899" />
          <rect x="7" y="11" width="1" height="2" fill="#F472B6" />

          {/* Broom Brush Body */}
          <rect x="5" y="12" width="6" height="3" fill="#8B5CF6" />
          <rect x="4" y="15" width="8" height="3" fill="#7C3AED" />
          <rect x="3" y="18" width="10" height="3" fill="#FDE68A" />

          {/* Broom Bristle Details */}
          <rect x="4" y="21" width="1.5" height="1.5" fill="#F59E0B" />
          <rect x="7" y="21" width="1.5" height="1.5" fill="#F59E0B" />
          <rect x="10" y="21" width="1.5" height="1.5" fill="#F59E0B" />

          {/* Cute Pixel Eyes */}
          {state === 'cleaning' ? (
            // Joyful Happy squint eyes ^^
            <>
              <rect x="6" y="13" width="2" height="1" fill="#FFFFFF" />
              <rect x="9" y="13" width="2" height="1" fill="#FFFFFF" />
            </>
          ) : state === 'detecting' ? (
            // Curious wide eyes
            <>
              <rect x="6" y="13" width="1.5" height="2" fill="#FFFFFF" />
              <rect x="6" y="14" width="1.5" height="1" fill="#0B0F19" />
              <rect x="9" y="13" width="1.5" height="2" fill="#FFFFFF" />
              <rect x="9" y="14" width="1.5" height="1" fill="#0B0F19" />
            </>
          ) : (
            // Standard cute shiny eyes
            <>
              <rect x="6" y="13" width="1.5" height="1.5" fill="#FFFFFF" />
              <rect x="9" y="13" width="1.5" height="1.5" fill="#FFFFFF" />
              <rect x="5.5" y="15" width="1" height="0.8" fill="#F472B6" />
              <rect x="10" y="15" width="1" height="0.8" fill="#F472B6" />
            </>
          )}

          {/* Sparkles around mascot */}
          {(state === 'clean' || state === 'cleaning') && (
            <>
              <rect x="18" y="12" width="1.5" height="1.5" fill="#FBBF24" />
              <rect x="19" y="10.5" width="1.5" height="1.5" fill="#FFFFFF" />
              <rect x="20.5" y="12" width="1.5" height="1.5" fill="#FBBF24" />
              <rect x="19" y="13.5" width="1.5" height="1.5" fill="#FBBF24" />

              <rect x="1" y="8" width="1" height="1" fill="#EC4899" />
              <rect x="2" y="7" width="1" height="1" fill="#F472B6" />
              <rect x="3" y="8" width="1" height="1" fill="#EC4899" />
            </>
          )}
        </svg>
      </div>
    </div>
  );
};
