import React from 'react';
import { ShieldCheck, Cpu, Zap, GitCompare } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

export const WhyKireiPaste: React.FC = () => {
  const { t } = useLanguage();

  const reasons = [
    {
      icon: ShieldCheck,
      iconColor: 'text-kirei-green',
      bgColor: 'bg-kirei-green/10',
      borderColor: 'border-kirei-green/30',
      title: t('why.items.0.title'),
      desc: t('why.items.0.desc'),
    },
    {
      icon: Cpu,
      iconColor: 'text-kirei-purple-light',
      bgColor: 'bg-kirei-purple/10',
      borderColor: 'border-kirei-purple/30',
      title: t('why.items.1.title'),
      desc: t('why.items.1.desc'),
    },
    {
      icon: Zap,
      iconColor: 'text-kirei-yellow',
      bgColor: 'bg-kirei-yellow/10',
      borderColor: 'border-kirei-yellow/30',
      title: t('why.items.2.title'),
      desc: t('why.items.2.desc'),
    },
    {
      icon: GitCompare,
      iconColor: 'text-kirei-pink-light',
      bgColor: 'bg-kirei-pink/10',
      borderColor: 'border-kirei-pink/30',
      title: t('why.items.3.title'),
      desc: t('why.items.3.desc'),
    },
  ];

  return (
    <section id="why-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-xs font-mono uppercase tracking-widest text-kirei-yellow mb-3">
          Architecture & Privacy
        </h2>
        <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          {t('why.sectionTitle')}
        </h3>
        <p className="mt-3 text-sm sm:text-base text-kirei-text-secondary leading-relaxed">
          {t('why.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reasons.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-kirei-panel border border-kirei-borderSubtle hover:border-kirei-borderHighlight transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div
                  className={`w-12 h-12 rounded-xl ${item.bgColor} border ${item.borderColor} flex items-center justify-center mb-5`}
                >
                  <Icon className={`w-6 h-6 ${item.iconColor}`} />
                </div>
                <h4 className="text-base font-bold text-white mb-2">{item.title}</h4>
                <p className="text-xs sm:text-sm text-kirei-text-secondary leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
