import React from 'react';
import { Modal } from '../ui/Modal';
import { CleaningOptions, DEFAULT_CLEANING_OPTIONS } from '../../types/rules';
import { useLanguage } from '../../i18n/LanguageContext';
import { RotateCcw, Check, Sparkles, Shield, FileText, Code, AlignLeft } from 'lucide-react';

interface RuleSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  options: CleaningOptions;
  onChangeOptions: (options: CleaningOptions) => void;
}

export const RuleSettingsModal: React.FC<RuleSettingsModalProps> = ({
  isOpen,
  onClose,
  options,
  onChangeOptions,
}) => {
  const { t } = useLanguage();

  const handleToggle = (key: keyof CleaningOptions) => {
    onChangeOptions({
      ...options,
      [key]: !options[key],
    });
  };

  const handleReset = () => {
    onChangeOptions({ ...DEFAULT_CLEANING_OPTIONS });
  };

  const renderToggleRow = (
    key: keyof CleaningOptions,
    titleKey: string,
    description?: string
  ) => {
    const isChecked = Boolean(options[key]);

    return (
      <label className="flex items-start justify-between gap-4 p-3 rounded-lg bg-kirei-surface hover:bg-kirei-card/60 border border-kirei-borderSubtle cursor-pointer transition-colors">
        <div className="space-y-0.5 flex-1">
          <p className="text-xs font-semibold text-kirei-text-primary">
            {t(titleKey)}
          </p>
          {description && (
            <p className="text-[11px] text-kirei-text-muted leading-relaxed">
              {description}
            </p>
          )}
        </div>
        <div className="relative inline-flex items-center cursor-pointer shrink-0 mt-0.5">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => handleToggle(key)}
            className="sr-only peer"
          />
          <div className="w-9 h-5 bg-kirei-card peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-kirei-purple border border-kirei-border" />
        </div>
      </label>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('rulesModal.title')}
      subtitle={t('rulesModal.subtitle')}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-6">
        {/* Section 1: Whitespace & Lines */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-kirei-yellow">
            <AlignLeft className="w-4 h-4" />
            <span>{t('rulesModal.groups.whitespace')}</span>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {renderToggleRow('normalizeSpaces', 'rulesModal.normalizeSpaces')}
            {renderToggleRow('normalizeTabs', 'rulesModal.normalizeTabs')}
            {renderToggleRow('trimLineEnds', 'rulesModal.trimLineEnds')}
            {renderToggleRow('removeExcessBlankLines', 'rulesModal.removeExcessBlankLines')}
          </div>
        </div>

        {/* Section 2: PDF & Document Formatting */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-kirei-cyan">
            <FileText className="w-4 h-4" />
            <span>{t('rulesModal.groups.pdf')}</span>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {renderToggleRow('fixPdfHyphenation', 'rulesModal.fixPdfHyphenation')}
            {renderToggleRow('fixPdfLineBreaks', 'rulesModal.fixPdfLineBreaks')}
            {renderToggleRow('removePageArtifacts', 'rulesModal.removePageArtifacts')}
          </div>
        </div>

        {/* Section 3: Unicode & Invisible Characters */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-kirei-pink">
            <Sparkles className="w-4 h-4" />
            <span>{t('rulesModal.groups.unicode')}</span>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {renderToggleRow('removeZeroWidthChars', 'rulesModal.removeZeroWidthChars')}
            {renderToggleRow('normalizeNonBreakingSpaces', 'rulesModal.normalizeNonBreakingSpaces')}
            {renderToggleRow('normalizeFullWidth', 'rulesModal.normalizeFullWidth')}
          </div>
        </div>

        {/* Section 4: Markup & AI Cleanup */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-kirei-purple-light">
            <Code className="w-4 h-4" />
            <span>{t('rulesModal.groups.markup')}</span>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {renderToggleRow('cleanAiPreamble', 'rulesModal.cleanAiPreamble')}
            {renderToggleRow('stripHtmlTags', 'rulesModal.stripHtmlTags')}
            {renderToggleRow('cleanMarkdownArtifacts', 'rulesModal.cleanMarkdownArtifacts')}
            {renderToggleRow('removeDuplicateLines', 'rulesModal.removeDuplicateLines')}
          </div>
        </div>

        {/* Section 5: Safety Guards */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-kirei-green">
            <Shield className="w-4 h-4" />
            <span>{t('rulesModal.groups.preservation')}</span>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {renderToggleRow('preserveCodeBlocks', 'rulesModal.preserveCodeBlocks')}
            {renderToggleRow('preserveLists', 'rulesModal.preserveLists')}
          </div>
        </div>

        {/* Footer actions */}
        <div className="pt-4 border-t border-kirei-borderSubtle flex items-center justify-between gap-3">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-kirei-surface hover:bg-kirei-card border border-kirei-borderSubtle text-xs text-kirei-text-secondary hover:text-white transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t('rulesModal.reset')}</span>
          </button>
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-kirei-purple hover:bg-kirei-purple-light text-white text-xs font-bold shadow-glow-purple transition-all"
          >
            <Check className="w-4 h-4" />
            <span>{t('rulesModal.save')}</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};
