import React from 'react';
import {
  Sparkles,
  FileText,
  Bot,
  EyeOff,
  Type,
  Table,
  ArrowRight,
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { PresetId } from '../../types/rules';

interface FeatureModesProps {
  onSelectPreset: (presetId: PresetId) => void;
}

export const FeatureModes: React.FC<FeatureModesProps> = ({ onSelectPreset }) => {
  const { t } = useLanguage();

  const featureCards = [
    {
      icon: Sparkles,
      iconColor: 'text-kirei-purple-light',
      borderColor: 'group-hover:border-kirei-purple/50',
      title: t('features.items.0.title'),
      desc: t('features.items.0.desc'),
      preset: 'all-in-one' as PresetId,
      highlight: 'Multi-space · Tabs · Blank lines',
    },
    {
      icon: FileText,
      iconColor: 'text-kirei-cyan',
      borderColor: 'group-hover:border-kirei-cyan/50',
      title: t('features.items.1.title'),
      desc: t('features.items.1.desc'),
      preset: 'pdf' as PresetId,
      highlight: 'De-hyphenate · Column unwrap',
    },
    {
      icon: Bot,
      iconColor: 'text-kirei-pink',
      borderColor: 'group-hover:border-kirei-pink/50',
      title: t('features.items.2.title'),
      desc: t('features.items.2.desc'),
      preset: 'ai-chat' as PresetId,
      highlight: 'Intro removal · Fence unwrap',
    },
    {
      icon: EyeOff,
      iconColor: 'text-rose-400',
      borderColor: 'group-hover:border-rose-500/50',
      title: t('features.items.3.title'),
      desc: t('features.items.3.desc'),
      preset: 'code-safe' as PresetId,
      highlight: 'Zero-width · BOM · Hidden tags',
    },
    {
      icon: Type,
      iconColor: 'text-kirei-yellow',
      borderColor: 'group-hover:border-kirei-yellow/50',
      title: t('features.items.4.title'),
      desc: t('features.items.4.desc'),
      preset: 'plain-text' as PresetId,
      highlight: 'Full-width ASCII · Curly quotes',
    },
    {
      icon: Table,
      iconColor: 'text-emerald-400',
      borderColor: 'group-hover:border-emerald-500/50',
      title: t('features.items.5.title'),
      desc: t('features.items.5.desc'),
      preset: 'plain-text' as PresetId,
      highlight: 'Spreadsheet · CSV/TSV cleanup',
    },
  ];

  return (
    <section id="features-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <h2 className="text-xs font-pixel uppercase tracking-widest text-kirei-purple-light mb-3">
          MODULAR ENGINE
        </h2>
        <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          {t('features.sectionTitle')}
        </h3>
        <p className="mt-3 text-sm sm:text-base text-kirei-text-secondary leading-relaxed">
          {t('features.sectionSubtitle')}
        </p>
      </div>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featureCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              onClick={() => {
                onSelectPreset(card.preset);
                const el = document.getElementById('cleaner-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`group relative p-6 rounded-2xl bg-kirei-panel border border-kirei-borderSubtle ${card.borderColor} transition-all duration-200 hover:-translate-y-1 hover:shadow-xl cursor-pointer flex flex-col justify-between shadow-panel`}
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-kirei-card border border-kirei-borderSubtle flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-200">
                  <Icon className={`w-6 h-6 ${card.iconColor}`} />
                </div>
                <h4 className="text-lg font-bold text-white mb-2 group-hover:text-kirei-purple-light transition-colors font-sans">
                  {card.title}
                </h4>
                <p className="text-xs sm:text-sm text-kirei-text-secondary leading-relaxed mb-4">
                  {card.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-kirei-borderSubtle flex items-center justify-between text-xs font-mono">
                <span className="text-kirei-text-muted text-[11px]">{card.highlight}</span>
                <span className="text-kirei-purple-light opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 font-semibold">
                  <span>Try mode</span> <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
