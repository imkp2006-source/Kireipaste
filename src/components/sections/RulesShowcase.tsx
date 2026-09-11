import React, { useState } from 'react';
import { Sparkles, Check, Copy } from 'lucide-react';
import { cleanText } from '../../engine';
import { useToast } from '../ui/Toast';

export const RulesShowcase: React.FC = () => {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<number>(0);

  const showcaseCases = [
    {
      title: 'PDF Column Wrap & Hyphenation',
      subtitle: 'Reconnects split words and multi-column hard breaks without touching intentional hyphens.',
      messy: `The deep neural network archi-\ntecture incorporates atten-\ntion mechanisms across lay-\ners to maintain coherence.\n\nPage 4 of 28\n\nPerformance metrics indicate a\n3.5x throughput gain.`,
      preset: { fixPdfHyphenation: true, fixPdfLineBreaks: true, removePageArtifacts: true },
    },
    {
      title: 'Source Code Indentation Guard',
      subtitle: 'Preserves 4-space indentations, braces, and function structure without destructive reformatting.',
      messy: `function cleanText(text) {\n    const result = text.trim();   \n\n    if (!result) {\n        return "";\n    }\n\n    return result;   \n}`,
      preset: { preserveCodeBlocks: true, trimLineEnds: true },
    },
    {
      title: 'AI Conversational Preamble',
      subtitle: 'Strips chatbot fluff, stray code fences, and "Copy code" buttons pasted from web chats.',
      messy: `Certainly! Here is the summary you requested:\n\nCopy code\n\`\`\`markdown\n- High availability cluster\n- Multi-region replication\n\`\`\`\n\nHope this helps! Let me know if you need anything else!`,
      preset: { cleanAiPreamble: true, stripHtmlTags: true, cleanMarkdownArtifacts: true },
    },
    {
      title: 'Invisible Characters & Zero-Width Spaces',
      subtitle: 'Eliminates zero-width spaces (ZWSP), BOM, and invisible control codes that break code and searches.',
      messy: `function calculateTotal(order\u200BId) {\n  // Hidden zero-width space\u200B in variable name\n  const total = getPrice(order\u200BId);\n  return total;   \n}`,
      preset: { removeZeroWidthChars: true, trimLineEnds: true },
    },
    {
      title: 'Full-Width ASCII & Curly Quotes',
      subtitle: 'Converts full-width Latin/numbers (Ａ-Ｚ, ０-９) to standard ASCII and harmonizes quotes.',
      messy: `The agreement was signed on ２０２６年０８月３０日.\n“All deliverables must comply with Section ４．２.”\n‘Terms are binding.’`,
      preset: { normalizeFullWidth: true, normalizeQuotes: 'straight' },
    },
  ];

  const currentCase = showcaseCases[activeTab];
  const cleanedResult = cleanText(currentCase.messy, currentCase.preset as any);

  const handleCopyShowcase = async () => {
    try {
      await navigator.clipboard.writeText(cleanedResult.cleanedText);
      showToast('Cleaned sample copied to clipboard!', 'success');
    } catch {
      showToast('Failed to copy', 'error');
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="rounded-3xl bg-kirei-panel border border-kirei-border p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Background glow accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-kirei-purple/10 blur-[100px] pointer-events-none" />

        {/* Section title */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-kirei-purple/10 border border-kirei-purple/30 text-xs font-mono text-kirei-purple-light mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="font-pixel text-[10px]">INTERACTIVE BEFORE & AFTER</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            See How KireiPaste Repairs Text
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-kirei-text-secondary">
            Click across real-world copy-paste scenarios to see the deterministic transformation.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          {showcaseCases.map((sc, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono whitespace-nowrap transition-all active:scale-95 ${
                activeTab === idx
                  ? 'bg-kirei-purple text-white shadow-glow-purple font-bold border border-kirei-purple-light/40'
                  : 'bg-kirei-card text-kirei-text-secondary hover:text-white hover:bg-kirei-cardHover border border-kirei-borderSubtle'
              }`}
            >
              {sc.title}
            </button>
          ))}
        </div>

        {/* Comparison Box */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Before */}
          <div className="rounded-xl bg-kirei-surface border border-rose-500/30 p-4 sm:p-5 flex flex-col justify-between shadow-panel">
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-kirei-borderSubtle">
                <span className="text-xs font-pixel font-bold text-rose-400 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_6px_rgba(244,63,94,0.8)]" />
                  MESSY RAW INPUT
                </span>
                <span className="text-[11px] font-mono text-kirei-text-muted">
                  {currentCase.messy.length} chars
                </span>
              </div>
              <pre className="text-xs sm:text-sm font-mono text-rose-200/90 whitespace-pre-wrap leading-relaxed">
                {currentCase.messy}
              </pre>
            </div>
            <div className="mt-4 pt-3 border-t border-kirei-borderSubtle text-[11px] font-mono text-kirei-text-muted">
              ⚠️ Contains line breaks, hyphens, or formatting artifacts
            </div>
          </div>

          {/* After */}
          <div className="rounded-xl bg-kirei-surface border border-emerald-500/30 p-4 sm:p-5 flex flex-col justify-between shadow-panel">
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-kirei-borderSubtle">
                <span className="text-xs font-pixel font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
                  KIREI CLEAN RESULT
                </span>
                <button
                  onClick={handleCopyShowcase}
                  className="flex items-center gap-1 text-[11px] font-mono font-semibold text-kirei-purple-light hover:text-white bg-kirei-card hover:bg-kirei-cardHover px-2.5 py-1 rounded-lg border border-kirei-borderSubtle transition-all active:scale-95"
                >
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </button>
              </div>
              <pre className="text-xs sm:text-sm font-mono text-emerald-200/90 whitespace-pre-wrap leading-relaxed">
                {cleanedResult.cleanedText}
              </pre>
            </div>
            <div className="mt-4 pt-3 border-t border-kirei-borderSubtle flex items-center justify-between text-[11px] text-kirei-text-muted">
              <span className="text-emerald-400 flex items-center gap-1.5 font-mono">
                <Check className="w-3.5 h-3.5" />
                <span>
                  {cleanedResult.fixedIssues.total > 0
                    ? `${cleanedResult.fixedIssues.total} issues fixed in ${cleanedResult.durationMs}ms`
                    : `Formatting verified & clean`}
                </span>
              </span>
              <span className="font-mono">{cleanedResult.afterStats.characters} chars</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
