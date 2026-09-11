import React, { useRef, useState } from 'react';
import { ClipboardPaste, Trash2, UploadCloud, Terminal } from 'lucide-react';
import { TextStatistics } from '../../types/cleaner';
import { useLanguage } from '../../i18n/LanguageContext';
import { StatsComparison } from './StatsComparison';

interface InputEditorProps {
  value: string;
  onChange: (value: string) => void;
  onPasteClipboard: () => void;
  onClear: () => void;
  stats: TextStatistics;
  isCodeDetected?: boolean;
}

export const InputEditor: React.FC<InputEditorProps> = ({
  value,
  onChange,
  onPasteClipboard,
  onClear,
  stats,
  isCodeDetected,
}) => {
  const { t } = useLanguage();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        if (text) {
          onChange(text);
        }
      };
      reader.readAsText(file);
    } else {
      const text = e.dataTransfer.getData('text');
      if (text) {
        onChange(text);
      }
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative flex flex-col h-full min-h-[390px] sm:min-h-[460px] rounded-xl bg-kirei-surface/95 border shadow-panel transition-all duration-200 focus-within:border-kirei-purple/60 focus-within:ring-1 focus-within:ring-kirei-purple/30 ${
        isDragging
          ? 'border-kirei-purple ring-2 ring-kirei-purple/40 bg-kirei-panel'
          : 'border-kirei-border hover:border-kirei-borderHighlight'
      }`}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-kirei-borderSubtle bg-kirei-panel/80 rounded-t-xl select-none">
        <div className="flex items-center gap-2.5">
          {/* Red indicator dot with retro glow */}
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-40"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.75)]"></span>
          </span>
          <h3 className="text-[11px] sm:text-xs font-pixel tracking-wider text-rose-300 uppercase">
            {t('cleaner.inputTitle')}
          </h3>
          {isCodeDetected && (
            <span className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-[9px] font-mono text-cyan-300">
              <Terminal className="w-2.5 h-2.5" />
              CODE
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onPasteClipboard}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-kirei-card hover:bg-kirei-cardHover border border-kirei-borderSubtle hover:border-kirei-purple/40 text-xs font-mono text-kirei-text-secondary hover:text-white transition-all active:scale-95"
            title={t('cleaner.paste')}
          >
            <ClipboardPaste className="w-3.5 h-3.5 text-kirei-purple-light" />
            <span className="hidden sm:inline">{t('cleaner.paste')}</span>
          </button>

          {value && (
            <button
              onClick={onClear}
              className="p-1 text-kirei-text-muted hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors active:scale-95"
              title={t('cleaner.clear')}
              aria-label="Clear input"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Editor textarea */}
      <div className="relative flex-1 p-3 sm:p-4 flex flex-col">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={t('cleaner.inputPlaceholder')}
          className="w-full flex-1 bg-transparent text-kirei-text-primary text-sm sm:text-[14.5px] font-mono leading-relaxed resize-none focus:outline-none placeholder:text-kirei-text-dim/60 custom-scrollbar selection:bg-kirei-purple selection:text-white"
          spellCheck={false}
          aria-label={t('cleaner.inputTitle')}
        />

        {/* Drag overlay indicator */}
        {isDragging && (
          <div className="absolute inset-0 m-3 rounded-lg border-2 border-dashed border-kirei-purple bg-kirei-panel/95 flex flex-col items-center justify-center gap-2 pointer-events-none z-10 animate-fade-in">
            <UploadCloud className="w-8 h-8 text-kirei-purple animate-bounce" />
            <p className="text-xs font-mono text-kirei-purple-light">Drop text or document file here</p>
          </div>
        )}
      </div>

      {/* Bottom stats footer */}
      <div className="flex items-center justify-between px-4 py-2 border-t border-kirei-borderSubtle bg-kirei-panel/50 rounded-b-xl">
        <StatsComparison beforeStats={stats} />
        {value.length > 0 && (
          <span className="text-[10px] font-mono text-kirei-text-dim hidden md:inline">
            UTF-8 · {stats.bytes}B
          </span>
        )}
      </div>
    </div>
  );
};
