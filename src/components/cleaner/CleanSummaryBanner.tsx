import React from 'react';
import { CheckCircle2, Zap, RotateCcw, Copy, Sparkles, Terminal } from 'lucide-react';
import { CleaningResult, IssueCategoryKey } from '../../types/cleaner';
import { useLanguage } from '../../i18n/LanguageContext';
import { PixelBadge } from '../pixel/PixelBadge';

interface CleanSummaryBannerProps {
  result: CleaningResult;
  onUndo: () => void;
  onCopy: () => void;
  isCopied: boolean;
}

export const CleanSummaryBanner: React.FC<CleanSummaryBannerProps> = ({
  result,
  onUndo,
  onCopy,
  isCopied,
}) => {
  const { t } = useLanguage();

  const totalFixed = result.fixedIssues.total;

  const rawIssueList: { key: IssueCategoryKey; label: string; count: number }[] = [
    { key: 'extraSpaces', label: t('categories.extraSpaces'), count: result.fixedIssues.extraSpaces },
    { key: 'brokenLineBreaks', label: t('categories.brokenLineBreaks'), count: result.fixedIssues.brokenLineBreaks },
    { key: 'blankLines', label: t('categories.blankLines'), count: result.fixedIssues.blankLines },
    { key: 'invisibleChars', label: t('categories.invisibleChars'), count: result.fixedIssues.invisibleChars },
    { key: 'hyphenation', label: t('categories.hyphenation'), count: result.fixedIssues.hyphenation },
    { key: 'unicodeArtifacts', label: t('categories.unicodeArtifacts'), count: result.fixedIssues.unicodeArtifacts },
    { key: 'duplicateLines', label: t('categories.duplicateLines'), count: result.fixedIssues.duplicateLines },
    { key: 'aiPreamble', label: t('categories.aiPreamble'), count: result.fixedIssues.aiPreamble },
    { key: 'htmlMarkdown', label: t('categories.htmlMarkdown'), count: result.fixedIssues.htmlMarkdown },
  ];

  const issueKeys = rawIssueList.filter((item) => item.count > 0);

  return (
    <div className={`rounded-xl border p-4 sm:p-5 shadow-lg transition-all animate-fade-in space-y-3 ${
      totalFixed > 0
        ? 'bg-gradient-to-r from-kirei-panel via-kirei-surface to-kirei-panel border-kirei-purple/40 shadow-kirei-purple/10'
        : 'bg-gradient-to-r from-kirei-panel via-kirei-surface to-kirei-panel border-emerald-500/30 shadow-emerald-500/5'
    }`}>
      {/* Top summary row */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${
            totalFixed > 0
              ? 'bg-kirei-purple/20 border-kirei-purple/50 text-kirei-purple-light'
              : 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
          }`}>
            {totalFixed > 0 ? <Sparkles className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2 font-pixel tracking-wide">
              {totalFixed > 0
                ? t('cleaner.fixedSummary', { count: totalFixed, time: result.durationMs })
                : t('cleaner.fixedNone')}
            </h4>
            <div className="flex flex-wrap items-center gap-2.5 text-xs text-kirei-text-secondary mt-1 font-mono">
              <span className="flex items-center gap-1 text-kirei-yellow font-bold">
                <Zap className="w-3 h-3" />
                {result.durationMs}ms
              </span>
              <span>•</span>
              {result.bytesSaved > 0 ? (
                <>
                  <span className="text-cyan-300">
                    {t('cleaner.bytesSaved', { bytes: result.bytesSaved })}
                  </span>
                  <span>•</span>
                </>
              ) : null}
              <span className="text-kirei-text-muted">
                {result.beforeStats.characters} chars →{' '}
                <span className="text-white font-semibold">{result.afterStats.characters} chars</span>
              </span>
              {result.isCodeDetected && (
                <>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1 text-cyan-300 text-[11px]">
                    <Terminal className="w-3 h-3" />
                    Code structure preserved
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Quick action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onUndo}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-kirei-card hover:bg-kirei-cardHover border border-kirei-borderSubtle text-xs font-mono text-kirei-text-secondary hover:text-white transition-all active:scale-95"
            title="Undo cleaning"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t('cleaner.undo')}</span>
          </button>
          <button
            onClick={onCopy}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all duration-200 active:scale-95 ${
              isCopied
                ? 'bg-emerald-500 text-black shadow-[0_0_12px_rgba(16,185,129,0.5)]'
                : 'bg-kirei-purple hover:bg-kirei-purple-light text-white shadow-glow-purple'
            }`}
          >
            <Copy className="w-3.5 h-3.5" />
            <span>{isCopied ? t('cleaner.copied') : t('cleaner.copy')}</span>
          </button>
        </div>
      </div>

      {/* Breakdown chips */}
      {issueKeys.length > 0 && (
        <div className="pt-2 border-t border-kirei-borderSubtle/60 flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-pixel text-kirei-text-muted">
            FIXED DETAILS:
          </span>
          {issueKeys.map((item) => (
            <PixelBadge
              key={item.key}
              size="sm"
              variant={
                item.key === 'extraSpaces'
                  ? 'yellow'
                  : item.key === 'hyphenation'
                  ? 'cyan'
                  : item.key === 'invisibleChars'
                  ? 'pink'
                  : item.key === 'brokenLineBreaks'
                  ? 'purple'
                  : 'green'
              }
            >
              <span>{item.label}</span>
              <span className="font-bold opacity-90 font-mono">({item.count})</span>
            </PixelBadge>
          ))}
        </div>
      )}
    </div>
  );
};
