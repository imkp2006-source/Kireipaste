import React, { useState } from 'react';
import { Copy, Check, Download, GitCompare, FileText, ChevronDown } from 'lucide-react';
import { CleaningResult, TextStatistics } from '../../types/cleaner';
import { useLanguage } from '../../i18n/LanguageContext';
import { StatsComparison } from './StatsComparison';
import { DiffViewer } from './DiffViewer';

interface OutputEditorProps {
  value: string;
  result: CleaningResult | null;
  onCopy: () => void;
  isCopied: boolean;
  onDownload: (format: 'txt' | 'md') => void;
  originalText: string;
}

export const OutputEditor: React.FC<OutputEditorProps> = ({
  value,
  result,
  onCopy,
  isCopied,
  onDownload,
  originalText,
}) => {
  const { t } = useLanguage();
  const [showDiff, setShowDiff] = useState(false);
  const [downloadMenuOpen, setDownloadMenuOpen] = useState(false);

  const stats: TextStatistics = result
    ? result.afterStats
    : {
        characters: value.length,
        charactersWithoutSpaces: value.replace(/\s/g, '').length,
        words: value.trim() ? value.trim().split(/\s+/).length : 0,
        lines: value ? value.split(/\r?\n/).length : 0,
        paragraphs: value ? value.split(/\n\s*\n/).filter(Boolean).length : 0,
        bytes: new Blob([value]).size,
        readingTimeSeconds: 1,
      };

  return (
    <div className="relative flex flex-col h-full min-h-[390px] sm:min-h-[460px] rounded-xl bg-kirei-surface/95 border border-kirei-border hover:border-kirei-borderHighlight shadow-panel transition-all duration-200">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-kirei-borderSubtle bg-kirei-panel/80 rounded-t-xl select-none">
        <div className="flex items-center gap-2.5">
          {/* Green indicator dot with retro glow */}
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-40"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.75)]"></span>
          </span>
          <h3 className="text-[11px] sm:text-xs font-pixel tracking-wider text-emerald-300 uppercase">
            {t('cleaner.outputTitle')}
          </h3>
        </div>

        {/* Output Controls (Diff View, Download, Copy) */}
        <div className="flex items-center gap-1.5">
          {/* Diff Toggle */}
          {result && originalText && (
            <button
              onClick={() => setShowDiff(!showDiff)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-mono font-medium transition-all active:scale-95 ${
                showDiff
                  ? 'bg-kirei-purple/25 border-kirei-purple text-kirei-purple-light shadow-sm'
                  : 'bg-kirei-card hover:bg-kirei-cardHover border-kirei-borderSubtle text-kirei-text-secondary hover:text-white'
              }`}
              title="Toggle Diff comparison"
            >
              <GitCompare className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {showDiff ? t('cleaner.textView') : t('cleaner.diffView')}
              </span>
            </button>
          )}

          {/* Download Dropdown */}
          {value && (
            <div className="relative">
              <button
                onClick={() => setDownloadMenuOpen(!downloadMenuOpen)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-kirei-card hover:bg-kirei-cardHover border border-kirei-borderSubtle hover:border-kirei-purple/40 text-xs font-mono text-kirei-text-secondary hover:text-white transition-all active:scale-95"
                title={t('cleaner.download')}
              >
                <Download className="w-3.5 h-3.5" />
                <ChevronDown className="w-3 h-3" />
              </button>

              {downloadMenuOpen && (
                <div className="absolute right-0 mt-1 w-40 bg-kirei-panel border border-kirei-border rounded-xl shadow-xl py-1 z-30 animate-scale-up">
                  <button
                    onClick={() => {
                      onDownload('txt');
                      setDownloadMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-mono text-kirei-text-secondary hover:text-white hover:bg-kirei-card flex items-center gap-2 transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5 text-slate-300" />
                    <span>{t('cleaner.downloadTxt')}</span>
                  </button>
                  <button
                    onClick={() => {
                      onDownload('md');
                      setDownloadMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-mono text-kirei-text-secondary hover:text-white hover:bg-kirei-card flex items-center gap-2 transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5 text-kirei-purple-light" />
                    <span>{t('cleaner.downloadMd')}</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Copy Button */}
          <button
            onClick={onCopy}
            disabled={!value}
            className={`flex items-center gap-1.5 px-3.5 py-1 rounded-lg text-xs font-mono font-bold transition-all duration-200 active:scale-95 ${
              !value
                ? 'opacity-40 cursor-not-allowed bg-kirei-card text-kirei-text-muted border border-kirei-borderSubtle'
                : isCopied
                ? 'bg-emerald-500 text-black shadow-[0_0_12px_rgba(16,185,129,0.5)]'
                : 'bg-kirei-purple hover:bg-kirei-purple-light text-white shadow-glow-purple'
            }`}
          >
            {isCopied ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{isCopied ? t('cleaner.copied') : t('cleaner.copy')}</span>
          </button>
        </div>
      </div>

      {/* Editor or Diff area */}
      <div className="relative flex-1 flex flex-col overflow-hidden">
        {showDiff && result ? (
          <DiffViewer
            originalText={originalText}
            cleanedText={value}
            diffParts={result.diffParts}
          />
        ) : (
          <div className="p-3 sm:p-4 flex-1 flex flex-col">
            <textarea
              value={value}
              readOnly
              placeholder={t('cleaner.outputPlaceholder')}
              className="w-full flex-1 bg-transparent text-kirei-text-primary text-sm sm:text-[14.5px] font-mono leading-relaxed resize-none focus:outline-none placeholder:text-kirei-text-dim/60 custom-scrollbar selection:bg-kirei-purple selection:text-white"
              spellCheck={false}
              aria-label={t('cleaner.outputTitle')}
            />
          </div>
        )}
      </div>

      {/* Bottom stats footer */}
      <div className="flex items-center justify-between px-4 py-2 border-t border-kirei-borderSubtle bg-kirei-panel/50 rounded-b-xl">
        <StatsComparison
          beforeStats={result ? result.beforeStats : stats}
          afterStats={stats}
          showComparison={Boolean(result && result.fixedIssues.total > 0)}
        />
        {result && result.durationMs !== undefined && (
          <span className="text-[10px] font-pixel text-kirei-yellow hidden sm:inline">
            ⚡ {result.durationMs}ms
          </span>
        )}
      </div>
    </div>
  );
};
