import React from 'react';
import {
  FileText,
  Sparkles,
  CheckCircle2,
  Cpu,
  Zap,
  Code2,
  BookOpen,
  GraduationCap,
  PenTool,
  Terminal,
  Briefcase,
  ArrowUpRight,
} from 'lucide-react';

export const SeoContentSection: React.FC = () => {
  const scrollToCleaner = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('cleaner-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="guide-section" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-kirei-borderSubtle">
      <div className="space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-kirei-purple/10 border border-kirei-purple/30 text-xs font-pixel text-kirei-purple-light mb-4">
            <Sparkles className="w-3.5 h-3.5 text-kirei-yellow" />
            <span>THE DEFINITIVE GUIDE</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Clean Up Pasted Text Without the Manual Cleanup
          </h2>
          <p className="mt-4 text-sm sm:text-base text-kirei-text-secondary leading-relaxed">
            Copying text between PDFs, websites, documents, chat messages, and coding environments frequently introduces unwanted formatting artifacts. KireiPaste provides a focused, browser-based solution to clean that content instantly before you reuse it.
          </p>
        </div>

        {/* 1. What Is KireiPaste */}
        <div className="p-6 sm:p-8 rounded-2xl bg-kirei-panel border border-kirei-borderSubtle shadow-panel">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-kirei-purple/15 border border-kirei-purple/30 flex items-center justify-center text-kirei-purple-light">
              <Sparkles className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              What Is KireiPaste?
            </h2>
          </div>
          <div className="space-y-4 text-sm sm:text-base text-kirei-text-secondary leading-relaxed">
            <p>
              KireiPaste is a dedicated online <strong className="text-white font-medium">text cleaner</strong> designed to <strong className="text-kirei-purple-light font-medium">clean up pasted text</strong> after copying it from complex digital sources. When you copy sentences or paragraphs from digital documents, the clipboard often captures hidden line wraps, redundant spaces, erratic tabs, and stray Unicode glyphs that distort the layout when pasted elsewhere.
            </p>
            <p>
              Instead of relying on heavy word processors or unpredictable AI models that might rewrite sentences, alter spelling, or change your phrasing, KireiPaste uses deterministic formatting algorithms. It sanitizes the formatting of your text while guaranteeing that your actual words, numbers, and technical terminology remain completely untouched. Everything runs locally in your browser with zero latency and absolute privacy.
            </p>
          </div>
        </div>

        {/* 2. Grid of Core Capabilities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card: Clean Messy Text */}
          <div className="p-6 sm:p-8 rounded-2xl bg-kirei-panel border border-kirei-borderSubtle shadow-panel flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-kirei-pink/15 border border-kirei-pink/30 flex items-center justify-center text-kirei-pink mb-4">
                <FileText className="w-5 h-5" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-3">
                Clean Messy Text From PDFs, Documents, and Web Pages
              </h2>
              <p className="text-sm text-kirei-text-secondary leading-relaxed">
                Messy text originates from many places: scanned OCR pages, multi-column journal articles, AI chat transcripts, spreadsheet tables, and web articles. When pasted into your notes, emails, or CMS, these sources bring along unwanted breaks and irregular gaps. KireiPaste is purpose-built to <strong className="text-white font-medium">clean messy text</strong> into clean, readable typography with a single click.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-kirei-borderSubtle/60 text-xs font-mono text-kirei-pink-light">
              ✓ Normalizes line breaks · Strips OCR glitches
            </div>
          </div>

          {/* Card: Remove Extra Spaces */}
          <div className="p-6 sm:p-8 rounded-2xl bg-kirei-panel border border-kirei-borderSubtle shadow-panel flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-kirei-yellow/15 border border-kirei-yellow/30 flex items-center justify-center text-kirei-yellow mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-3">
                Remove Extra Spaces From Text
              </h2>
              <p className="text-sm text-kirei-text-secondary leading-relaxed">
                Excessive whitespace is one of the most frequent clipboard annoyances. Double spaces between words, inconsistent tab indents, and clusters of trailing spaces clutter your copy. KireiPaste allows you to effortlessly <strong className="text-white font-medium">remove extra spaces from text</strong>, collapsing multi-spaces down to single spaces and trimming line ends without destroying intentional source code structure.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-kirei-borderSubtle/60 text-xs font-mono text-kirei-yellow-light">
              ✓ Single-space normalization · Trailing trim
            </div>
          </div>

          {/* Card: Clean PDF Copied Text */}
          <div className="p-6 sm:p-8 rounded-2xl bg-kirei-panel border border-kirei-borderSubtle shadow-panel flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-300 mb-4">
                <BookOpen className="w-5 h-5" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-3">
                Clean PDF Copied Text and Rejoin Broken Lines
              </h2>
              <p className="text-sm text-kirei-text-secondary leading-relaxed">
                PDF readers render text using absolute coordinates rather than continuous paragraphs. When you copy paragraphs, you often copy hard line breaks at the end of every column line and hyphenated split words like &ldquo;imple- mentation&rdquo;. KireiPaste is specially tuned to <strong className="text-white font-medium">clean PDF copied text</strong> by reconnecting split words, rejoining broken sentences, and filtering page headers.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-kirei-borderSubtle/60 text-xs font-mono text-cyan-300">
              ✓ De-hyphenate words · Join column wraps
            </div>
          </div>

          {/* Card: Remove Formatting From Text */}
          <div className="p-6 sm:p-8 rounded-2xl bg-kirei-panel border border-kirei-borderSubtle shadow-panel flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-300 mb-4">
                <Code2 className="w-5 h-5" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-3">
                Remove Formatting From Text Safely
              </h2>
              <p className="text-sm text-kirei-text-secondary leading-relaxed">
                Copying from rich text editors or web pages often carries invisible zero-width spaces (ZWSP), byte order marks (BOM), non-breaking spaces (NBSP), and full-width ASCII characters that can break database queries or code compilers. KireiPaste lets you <strong className="text-white font-medium">remove formatting from text</strong> safely, purging invisible bugs while keeping your legitimate punctuation intact.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-kirei-borderSubtle/60 text-xs font-mono text-emerald-300">
              ✓ Purge zero-width chars · Straighten quotes
            </div>
          </div>
        </div>

        {/* 3. Format Text Online in Seconds */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-kirei-panel via-kirei-surface to-kirei-panel border border-kirei-purple/30 shadow-panel">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
            Format Text Online in Seconds
          </h2>
          <p className="text-sm sm:text-base text-kirei-text-secondary leading-relaxed mb-6">
            When preparing text for notes, publications, or codebases, spending minutes manually editing every paragraph drains productivity. KireiPaste provides an ultra-fast way to <strong className="text-white font-medium">format text online</strong>. Select from curated presets—including Smart All-in-One, PDF Healer, AI Chat Cleaner, Pure Plain Text, and Code-Safe—or configure custom rules tailored to your exact publishing pipeline.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-3 rounded-xl bg-kirei-card border border-kirei-borderSubtle">
              <span className="text-kirei-yellow font-bold block mb-1">⚡ SUB-MILLISECOND</span>
              <span className="text-kirei-text-muted">Cleans thousands of words in under 15ms directly in your browser.</span>
            </div>
            <div className="p-3 rounded-xl bg-kirei-card border border-kirei-borderSubtle">
              <span className="text-cyan-300 font-bold block mb-1">🔍 DIFF VIEWER</span>
              <span className="text-kirei-text-muted">Inspect every character, space, or line change with visual diff comparisons.</span>
            </div>
            <div className="p-3 rounded-xl bg-kirei-card border border-kirei-borderSubtle">
              <span className="text-emerald-300 font-bold block mb-1">💾 ONE-CLICK EXPORT</span>
              <span className="text-kirei-text-muted">Instantly copy purified text or download clean .txt and .md files.</span>
            </div>
          </div>
        </div>

        {/* 4. Who Is KireiPaste For */}
        <div className="p-6 sm:p-8 rounded-2xl bg-kirei-panel border border-kirei-borderSubtle shadow-panel">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
            Who Is KireiPaste For?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-kirei-purple/20 border border-kirei-purple/40 flex items-center justify-center text-kirei-purple-light shrink-0 mt-0.5">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white mb-1">Students & Researchers</h3>
                <p className="text-xs text-kirei-text-secondary leading-relaxed">
                  Clean up citations, paper excerpts, and thesis quotes copied from JSTOR, ArXiv, and academic PDFs without broken wraps.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-pink-500/20 border border-pink-500/40 flex items-center justify-center text-pink-300 shrink-0 mt-0.5">
                <PenTool className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white mb-1">Writers & Editors</h3>
                <p className="text-xs text-kirei-text-secondary leading-relaxed">
                  Strip messy formatting from draft notes, interview transcripts, and online sources before pasting into manuscripts.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 shrink-0 mt-0.5">
                <Terminal className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white mb-1">Developers & Engineers</h3>
                <p className="text-xs text-kirei-text-secondary leading-relaxed">
                  Purge invisible zero-width bugs and trailing junk from copied snippets while keeping 2-space and 4-space indentations safe.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300 shrink-0 mt-0.5">
                <Briefcase className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white mb-1">Office & Business Teams</h3>
                <p className="text-xs text-kirei-text-secondary leading-relaxed">
                  Format customer reports, email threads, and spreadsheet pasteboard text quickly for polished slide decks and emails.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-kirei-yellow/20 border border-kirei-yellow/40 flex items-center justify-center text-kirei-yellow shrink-0 mt-0.5">
                <Cpu className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white mb-1">AI Chatbot Users</h3>
                <p className="text-xs text-kirei-text-secondary leading-relaxed">
                  Strip conversational preambles (&ldquo;Certainly! Here is...&rdquo;) and &ldquo;Copy code&rdquo; labels from AI output in one click.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-300 shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white mb-1">Everyday Web Users</h3>
                <p className="text-xs text-kirei-text-secondary leading-relaxed">
                  Anyone who frequently copies and pastes text across different applications and wants clean, reliable formatting every time.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 5. How KireiPaste Works (3 Simple Steps) & CTA */}
        <div className="p-6 sm:p-8 rounded-2xl bg-kirei-panel border border-kirei-purple/40 shadow-panel text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
            How KireiPaste Works in 3 Steps
          </h2>
          <p className="text-xs sm:text-sm text-kirei-text-secondary max-w-2xl mx-auto mb-8">
            A frictionless loop designed to keep your clipboard clean and your productivity uninterrupted.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mb-8">
            <div className="p-5 rounded-xl bg-kirei-surface border border-kirei-borderSubtle">
              <div className="text-xs font-pixel text-rose-400 mb-2">STEP 01</div>
              <h3 className="text-sm font-bold text-white mb-1">Paste Your Messy Text</h3>
              <p className="text-xs text-kirei-text-secondary leading-relaxed">
                Paste copied content from any PDF, website, document, or AI chatbot into the left editor panel.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-kirei-surface border border-kirei-borderSubtle">
              <div className="text-xs font-pixel text-kirei-yellow mb-2">STEP 02</div>
              <h3 className="text-sm font-bold text-white mb-1">Automatic Detection</h3>
              <p className="text-xs text-kirei-text-secondary leading-relaxed">
                KireiPaste automatically detects excessive spaces, broken line breaks, PDF hyphens, and invisible Unicode bugs.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-kirei-surface border border-kirei-borderSubtle">
              <div className="text-xs font-pixel text-emerald-400 mb-2">STEP 03</div>
              <h3 className="text-sm font-bold text-white mb-1">Clean and Copy Instantly</h3>
              <p className="text-xs text-kirei-text-secondary leading-relaxed">
                Click KIREI IT to purify formatting, inspect the live diff comparison, and copy the clean output to your clipboard.
              </p>
            </div>
          </div>

          <div className="inline-flex flex-col items-center gap-3">
            <a
              href="#cleaner-section"
              onClick={scrollToCleaner}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-kirei-purple via-fuchsia-600 to-kirei-pink text-white font-pixel text-xs tracking-wider uppercase shadow-glow-purple hover:shadow-glow-pink hover:scale-105 active:scale-95 transition-all"
            >
              <span>TRY THE TEXT CLEANER NOW</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <span className="text-[11px] font-mono text-kirei-text-muted">
              100% Free · Client-Side Privacy · No Signup Required
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
