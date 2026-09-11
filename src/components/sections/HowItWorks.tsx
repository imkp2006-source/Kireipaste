import React from 'react';
import { ClipboardPaste, Search, Sparkles } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

export const HowItWorks: React.FC = () => {
  const { t } = useLanguage();

  const steps = [
    {
      step: '01',
      icon: ClipboardPaste,
      iconColor: 'text-rose-400',
      title: t('howItWorks.step1Title'),
      desc: t('howItWorks.step1Desc'),
    },
    {
      step: '02',
      icon: Search,
      iconColor: 'text-kirei-yellow',
      title: t('howItWorks.step2Title'),
      desc: t('howItWorks.step2Desc'),
    },
    {
      step: '03',
      icon: Sparkles,
      iconColor: 'text-kirei-purple-light',
      title: t('howItWorks.step3Title'),
      desc: t('howItWorks.step3Desc'),
    },
  ];

  return (
    <section id="how-it-works-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-kirei-borderSubtle">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-xs font-mono uppercase tracking-widest text-kirei-pink mb-3">
          Workflow
        </h2>
        <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          {t('howItWorks.sectionTitle')}
        </h3>
        <p className="mt-3 text-sm sm:text-base text-kirei-text-secondary leading-relaxed">
          {t('howItWorks.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={idx}
              className="relative p-6 sm:p-8 rounded-2xl bg-kirei-panel border border-kirei-borderSubtle hover:border-kirei-purple/40 transition-all duration-200"
            >
              <span className="text-3xl font-pixel font-bold text-kirei-text-dim/40 absolute top-5 right-6">
                {step.step}
              </span>
              <div className="w-12 h-12 rounded-xl bg-kirei-surface border border-kirei-borderSubtle flex items-center justify-center mb-6">
                <Icon className={`w-6 h-6 ${step.iconColor}`} />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">{step.title}</h4>
              <p className="text-xs sm:text-sm text-kirei-text-secondary leading-relaxed">
                {step.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
