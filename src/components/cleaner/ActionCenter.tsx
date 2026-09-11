import React from 'react';
import { Sparkles } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface ActionCenterProps {
  onClean: () => void;
  isCleaning: boolean;
  disabled: boolean;
}

export const ActionCenter: React.FC<ActionCenterProps> = ({
  onClean,
  isCleaning,
  disabled,
}) => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center py-3 sm:py-0 px-2 select-none">
      <button
        onClick={onClean}
        disabled={disabled || isCleaning}
        className={`relative group overflow-hidden px-8 py-3.5 rounded-xl font-pixel text-xs sm:text-sm tracking-wider uppercase transition-all duration-200 border-2 ${
          disabled
            ? 'opacity-40 cursor-not-allowed bg-kirei-panel text-kirei-text-muted border-kirei-borderSubtle'
            : isCleaning
            ? 'bg-gradient-to-r from-kirei-purple via-kirei-pink to-kirei-purple text-white shadow-glow-pink scale-95 border-kirei-pink animate-pulse'
            : 'bg-gradient-to-r from-kirei-purple via-fuchsia-600 to-kirei-pink text-white hover:shadow-glow-purple active:scale-95 border-purple-400/40 hover:border-pink-300/80 cursor-pointer shadow-pixel-solid'
        }`}
      >
        {/* Shimmer effect highlight */}
        {!disabled && (
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
        )}

        <div className="relative flex items-center gap-2.5">
          <Sparkles
            className={`w-4 h-4 text-kirei-yellow ${
              isCleaning ? 'animate-spin' : 'group-hover:rotate-12 transition-transform'
            }`}
          />
          <span>{isCleaning ? t('cleaner.cleaning') : t('cleaner.kireiButton')}</span>
        </div>
      </button>

      {/* Keyboard shortcut hint */}
      <span className="mt-2.5 text-[10px] font-mono text-kirei-text-muted hidden md:flex items-center gap-1.5">
        <span>Press</span>
        <kbd className="px-1.5 py-0.5 rounded bg-kirei-panel border border-kirei-border text-kirei-yellow font-pixel text-[9px] shadow-sm">
          Ctrl+Enter
        </kbd>
      </span>
    </div>
  );
};
