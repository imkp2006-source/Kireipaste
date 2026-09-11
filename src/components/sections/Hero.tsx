import React from 'react';
import { FileText, Bot, Globe, Scan } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { SAMPLE_TEXTS, SampleText } from '../../data/samples';
import { PixelMascot, MascotState } from '../pixel/PixelMascot';
import { PixelSparkle } from '../pixel/PixelSparkle';

interface HeroProps {
  onSelectSample: (sample: SampleText) => void;
  mascotState: MascotState;
}

export const Hero: React.FC<HeroProps> = ({ onSelectSample, mascotState }) => {
  const { t } = useLanguage();

  const getSampleIcon = (preset: string) => {
    switch (preset) {
      case 'pdf':
        return <FileText className="w-3.5 h-3.5 text-kirei-cyan" />;
      case 'ai-chat':
        return <Bot className="w-3.5 h-3.5 text-kirei-purple-light" />;
      case 'all-in-one':
        return <Globe className="w-3.5 h-3.5 text-kirei-pink-light" />;
      default:
        return <Scan className="w-3.5 h-3.5 text-kirei-yellow" />;
    }
  };

  return (
    <section className="relative pt-6 sm:pt-10 pb-6 text-center max-w-5xl mx-auto px-4 sm:px-6">
      {/* Top subtle badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-kirei-panel/80 border border-kirei-purple/30 text-xs font-mono text-kirei-purple-light mb-6 shadow-sm">
        <PixelSparkle size={12} color="yellow" />
        <span>{t('hero.badge')}</span>
        <span className="w-1.5 h-1.5 rounded-full bg-kirei-green animate-pulse" />
      </div>

      {/* Hero Headline */}
      <div className="relative inline-block">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.08] text-white">
          <span className="block">{t('hero.titleLine1')}</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-kirei-purple-light via-pink-400 to-kirei-yellow">
            {t('hero.titleLine2')}
          </span>
        </h1>

        {/* Mascot floating next to headline on desktop */}
        <div className="hidden md:block absolute -right-20 top-2">
          <PixelMascot
            size="lg"
            state={mascotState}
            showSpeechBubble={mascotState === 'detecting'}
            speechText="Found issues!"
          />
        </div>
      </div>

      {/* Subtitle */}
      <p className="mt-5 text-base sm:text-lg text-kirei-text-secondary max-w-2xl mx-auto leading-relaxed font-normal">
        {t('hero.subtitle')}
      </p>

      {/* Instant sample tester row */}
      <div className="mt-7 flex flex-wrap items-center justify-center gap-2 text-xs">
        <span className="text-kirei-text-muted font-mono text-[11px] mr-1">
          {t('hero.samplesPrompt')}
        </span>
        {SAMPLE_TEXTS.map((sample) => (
          <button
            key={sample.id}
            onClick={() => onSelectSample(sample)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-kirei-panel hover:bg-kirei-card border border-kirei-borderSubtle hover:border-kirei-purple/50 text-kirei-text-secondary hover:text-white transition-all duration-150 active:scale-95 shadow-sm"
          >
            {getSampleIcon(sample.preset)}
            <span>{sample.category}</span>
          </button>
        ))}
      </div>
    </section>
  );
};
