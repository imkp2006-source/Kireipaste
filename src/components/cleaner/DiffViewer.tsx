import React, { useState } from 'react';
import { DiffPart } from '../../types/cleaner';
import { computeLineDiff } from '../../engine/diff';
import { Columns, AlignJustify } from 'lucide-react';

interface DiffViewerProps {
  originalText: string;
  cleanedText: string;
  diffParts: DiffPart[];
}

export const DiffViewer: React.FC<DiffViewerProps> = ({
  originalText,
  cleanedText,
  diffParts,
}) => {
  const [viewMode, setViewMode] = useState<'inline' | 'split'>('inline');

  const lineDiffs = viewMode === 'split' ? computeLineDiff(originalText, cleanedText) : [];

  return (
    <div className="w-full h-full flex flex-col">
      {/* Diff toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-kirei-borderSubtle bg-kirei-panel/60 text-xs">
        <div className="flex items-center gap-3 font-mono">
          <span className="flex items-center gap-1.5 text-rose-400">
            <span className="w-2.5 h-2.5 rounded-sm bg-rose-500/40 border border-rose-500/70 inline-block" />
            Removed / Cleaned
          </span>
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500/40 border border-emerald-500/70 inline-block" />
            Fixed / Joined
          </span>
        </div>

        <div className="flex items-center gap-1 bg-kirei-surface p-0.5 rounded-lg border border-kirei-borderSubtle">
          <button
            onClick={() => setViewMode('inline')}
            className={`px-2 py-1 rounded text-[11px] font-medium flex items-center gap-1 transition-colors ${
              viewMode === 'inline'
                ? 'bg-kirei-card text-white shadow-sm'
                : 'text-kirei-text-secondary hover:text-white'
            }`}
          >
            <AlignJustify className="w-3 h-3" />
            <span>Inline</span>
          </button>
          <button
            onClick={() => setViewMode('split')}
            className={`px-2 py-1 rounded text-[11px] font-medium flex items-center gap-1 transition-colors ${
              viewMode === 'split'
                ? 'bg-kirei-card text-white shadow-sm'
                : 'text-kirei-text-secondary hover:text-white'
            }`}
          >
            <Columns className="w-3 h-3" />
            <span>Side-by-Side</span>
          </button>
        </div>
      </div>

      {/* Diff content box */}
      <div className="p-4 overflow-y-auto flex-1 font-mono text-sm leading-relaxed whitespace-pre-wrap selection:bg-kirei-purple selection:text-white">
        {viewMode === 'inline' ? (
          <div className="space-y-1">
            {diffParts.map((part, index) => {
              if (part.type === 'removed') {
                return (
                  <span
                    key={index}
                    className="bg-rose-500/20 text-rose-300 line-through rounded px-1 py-0.5 border border-rose-500/30 font-medium"
                    title="Removed artifact"
                  >
                    {part.value}
                  </span>
                );
              }
              if (part.type === 'added') {
                return (
                  <span
                    key={index}
                    className="bg-emerald-500/20 text-emerald-300 rounded px-1 py-0.5 border border-emerald-500/30 font-medium"
                    title="Cleaned replacement"
                  >
                    {part.value}
                  </span>
                );
              }
              return <span key={index} className="text-kirei-text-primary">{part.value}</span>;
            })}
          </div>
        ) : (
          /* Split View */
          <div className="grid grid-cols-2 gap-4 text-xs font-mono">
            {/* Left side (Original) */}
            <div className="space-y-1 border-r border-kirei-borderSubtle pr-3">
              <div className="text-[11px] font-semibold text-rose-400 pb-1 border-b border-kirei-borderSubtle/50 mb-2">
                ORIGINAL (Messy)
              </div>
              {lineDiffs.map((diff, i) => (
                <div
                  key={`left-${i}`}
                  className={`flex gap-2 py-0.5 px-1 rounded ${
                    diff.type === 'modified' || diff.type === 'removed'
                      ? 'bg-rose-500/15 text-rose-200'
                      : 'text-kirei-text-secondary'
                  }`}
                >
                  <span className="text-kirei-text-dim select-none w-6 text-right">
                    {diff.leftLineNumber || ''}
                  </span>
                  <span className="flex-1 break-all">{diff.leftText || ''}</span>
                </div>
              ))}
            </div>

            {/* Right side (Cleaned) */}
            <div className="space-y-1 pl-1">
              <div className="text-[11px] font-semibold text-emerald-400 pb-1 border-b border-kirei-borderSubtle/50 mb-2">
                KIREI (Clean)
              </div>
              {lineDiffs.map((diff, i) => (
                <div
                  key={`right-${i}`}
                  className={`flex gap-2 py-0.5 px-1 rounded ${
                    diff.type === 'modified' || diff.type === 'added'
                      ? 'bg-emerald-500/15 text-emerald-200'
                      : 'text-kirei-text-primary'
                  }`}
                >
                  <span className="text-kirei-text-dim select-none w-6 text-right">
                    {diff.rightLineNumber || ''}
                  </span>
                  <span className="flex-1 break-all">{diff.rightText || ''}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
