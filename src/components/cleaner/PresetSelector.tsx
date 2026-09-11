import React from 'react';
import { Sparkles, FileText, Bot, AlignLeft, Code, SlidersHorizontal } from 'lucide-react';
import { CLEANING_PRESETS } from '../../data/presets';
import { PresetId } from '../../types/rules';
import { useLanguage } from '../../i18n/LanguageContext';

interface PresetSelectorProps {
  activePreset: PresetId;
  onSelectPreset: (presetId: PresetId) => void;
  onOpenCustomRules: () => void;
}

export const PresetSelector: React.FC<PresetSelectorProps> = ({
  activePreset,
  onSelectPreset,
  onOpenCustomRules,
}) => {
  const { t } = useLanguage();

  const getIcon = (iconName: string, active: boolean) => {
    const cls = `w-3.5 h-3.5 ${active ? 'text-kirei-yellow' : 'text-kirei-text-secondary'}`;
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className={cls} />;
      case 'FileText':
        return <FileText className={cls} />;
      case 'Bot':
        return <Bot className={cls} />;
      case 'AlignLeft':
        return <AlignLeft className={cls} />;
      case 'Code':
        return <Code className={cls} />;
      default:
        return <Sparkles className={cls} />;
    }
  };

  return (
    <div className="w-full flex items-center justify-between gap-2 overflow-x-auto pb-1 scrollbar-none select-none">
      <div className="flex items-center gap-1.5 p-1 rounded-xl bg-kirei-surface border border-kirei-borderSubtle shadow-inner">
        {CLEANING_PRESETS.map((preset) => {
          const isActive = activePreset === preset.id;
          return (
            <button
              key={preset.id}
              onClick={() => onSelectPreset(preset.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono font-medium whitespace-nowrap transition-all duration-150 active:scale-95 ${
                isActive
                  ? 'bg-kirei-card text-white shadow-md border border-kirei-purple/50 ring-1 ring-kirei-purple/30 font-semibold'
                  : 'text-kirei-text-secondary hover:text-kirei-text-primary hover:bg-kirei-card/60 border border-transparent'
              }`}
            >
              {getIcon(preset.icon, isActive)}
              <span>{t(preset.nameKey)}</span>
              {preset.badge && (
                <span
                  className={`text-[9px] font-pixel px-1.5 py-0.2 rounded ${
                    isActive
                      ? 'bg-kirei-yellow/20 text-kirei-yellow border border-kirei-yellow/40'
                      : 'bg-kirei-panel text-kirei-text-muted border border-kirei-borderSubtle'
                  }`}
                >
                  {preset.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Customize rules button */}
      <button
        onClick={onOpenCustomRules}
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-kirei-surface hover:bg-kirei-card border border-kirei-borderSubtle hover:border-kirei-purple/40 text-xs font-mono text-kirei-text-secondary hover:text-kirei-purple-light whitespace-nowrap transition-all active:scale-95"
        title={t('cleaner.customizeRules')}
      >
        <SlidersHorizontal className="w-3.5 h-3.5 text-kirei-purple-light" />
        <span className="hidden sm:inline">{t('cleaner.customizeRules')}</span>
      </button>
    </div>
  );
};
