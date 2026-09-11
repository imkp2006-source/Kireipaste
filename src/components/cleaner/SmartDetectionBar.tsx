import React from 'react';
import { CheckCircle2, AlertTriangle, Terminal } from 'lucide-react';
import { DetectionResult } from '../../types/cleaner';
import { useLanguage } from '../../i18n/LanguageContext';
import { PixelBadge } from '../pixel/PixelBadge';

interface SmartDetectionBarProps {
  detection: DetectionResult;
  hasInputText: boolean;
}

export const SmartDetectionBar: React.FC<SmartDetectionBarProps> = ({
  detection,
  hasInputText,
}) => {
  const { t } = useLanguage();

  if (!hasInputText) {
    return (
      <div className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-kirei-surface/70 border border-kirei-borderSubtle text-xs text-kirei-text-muted select-none">
        <span className="font-mono flex items-center gap-2">
          <span className="w-2 h-2 rounded-sm bg-slate-600 animate-pulse" />
          <span className="text-kirei-text-secondary">&gt; Ready to inspect text from clipboard</span>
        </span>
        <span className="text-[11px] font-mono hidden sm:inline text-kirei-text-dim">
          Paste messy text or select a preset sample above
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-kirei-surface border border-kirei-border transition-all animate-fade-in">
      {/* Left status badge */}
      <div className="flex items-center gap-2.5 font-mono text-xs">
        {detection.hasIssues ? (
          <div className="flex items-center gap-2 text-kirei-yellow">
            <AlertTriangle className="w-4 h-4 text-kirei-yellow shrink-0 animate-pulse" />
            <span className="font-pixel text-[11px] text-kirei-yellow">
              {t('cleaner.statusIssues', { count: detection.issues.total })}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-emerald-400">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-pixel text-[11px] text-emerald-400">
              {t('cleaner.statusClean')}
            </span>
          </div>
        )}

        {/* Code detection badge */}
        {detection.isCodeDetected && (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-[11px] font-mono text-cyan-300">
            <Terminal className="w-3 h-3 text-cyan-400" />
            <span>Code detected — formatting preserved</span>
          </span>
        )}
      </div>

      {/* Right category pills */}
      {detection.hasIssues && (
        <div className="flex flex-wrap items-center gap-1.5">
          {detection.detectedCategories.map((cat) => (
            <PixelBadge
              key={cat.category}
              size="sm"
              variant={
                cat.category === 'extraSpaces'
                  ? 'yellow'
                  : cat.category === 'hyphenation'
                  ? 'cyan'
                  : cat.category === 'invisibleChars'
                  ? 'pink'
                  : cat.category === 'brokenLineBreaks'
                  ? 'purple'
                  : 'muted'
              }
            >
              <span>{t(`categories.${cat.category}`)}</span>
              <span className="opacity-90 font-bold font-mono">({cat.count})</span>
            </PixelBadge>
          ))}
        </div>
      )}
    </div>
  );
};
