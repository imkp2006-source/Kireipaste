import { CleaningOptions, DEFAULT_CLEANING_OPTIONS } from '../types/rules';
import { CleaningResult, IssueCount } from '../types/cleaner';
import { cleanWhitespace } from './rules/whitespace';
import { cleanPdfArtifacts } from './rules/pdf';
import { cleanInvisibleChars } from './rules/invisible';
import { cleanUnicodeArtifacts } from './rules/unicode';
import { cleanMarkdownHtml } from './rules/markdownHtml';
import { cleanDuplicateLines } from './rules/deduplication';
import { cleanAiArtifacts } from './rules/aiArtifacts';
import { calculateTextStats } from './stats';
import { computeWordDiff } from './diff';
import { isSourceCode } from './codeGuard';

/**
 * Main cleaning pipeline function.
 * Deterministic, fast, private, and preserves semantic text meaning and code structure.
 */
export function cleanText(
  rawText: string,
  userOptions?: Partial<CleaningOptions>
): CleaningResult {
  const startTime = performance.now();
  const options: CleaningOptions = { ...DEFAULT_CLEANING_OPTIONS, ...userOptions };

  if (!rawText || rawText.length === 0) {
    const emptyStats = calculateTextStats('');
    return {
      originalText: '',
      cleanedText: '',
      durationMs: 0,
      isCodeDetected: false,
      fixedIssues: {
        extraSpaces: 0,
        brokenLineBreaks: 0,
        blankLines: 0,
        invisibleChars: 0,
        hyphenation: 0,
        unicodeArtifacts: 0,
        duplicateLines: 0,
        aiPreamble: 0,
        htmlMarkdown: 0,
        total: 0,
      },
      beforeStats: emptyStats,
      afterStats: emptyStats,
      bytesSaved: 0,
      diffParts: [],
    };
  }

  const isCode = isSourceCode(rawText);
  const beforeStats = calculateTextStats(rawText);
  let workingText = rawText;

  // 1. AI conversation remnants, preambles & postambles (only if not source code)
  let aiCount = 0;
  if (!isCode) {
    const aiRes = cleanAiArtifacts(workingText, options);
    workingText = aiRes.text;
    aiCount = aiRes.aiCount;
  }

  // Code block preservation handling (protect inner code blocks from aggressive whitespace modifications)
  const preservedCodeBlocks: string[] = [];
  if (options.preserveCodeBlocks) {
    workingText = workingText.replace(/(```[\s\S]*?```|`[^`\n]+`)/g, (match) => {
      preservedCodeBlocks.push(match);
      return `__KIREI_CODE_BLOCK_${preservedCodeBlocks.length - 1}__`;
    });
  }

  // 2. Invisible characters & control codes (safe for both prose and code)
  const invisibleRes = cleanInvisibleChars(workingText, options);
  workingText = invisibleRes.text;

  // 3. Unicode normalization (NBSP, quotes, full-width)
  const unicodeRes = cleanUnicodeArtifacts(
    workingText,
    isCode ? { ...options, normalizeQuotes: 'keep' } : options
  );
  workingText = unicodeRes.text;

  // 4. HTML & Markdown cleanup (skip if raw code)
  let htmlMarkdownCount = 0;
  if (!isCode) {
    const markupRes = cleanMarkdownHtml(workingText, options);
    workingText = markupRes.text;
    htmlMarkdownCount = markupRes.htmlMarkdownCount;
  }

  // 5. PDF hyphenation & line break repairs (skip if code)
  const pdfRes = cleanPdfArtifacts(workingText, options, isCode);
  workingText = pdfRes.text;

  // 6. Duplicate lines removal (only if explicitly enabled)
  const dupRes = cleanDuplicateLines(workingText, options);
  workingText = dupRes.text;

  // 7. Whitespace, tabs, line endings, and excess blank lines (guards code indentations)
  const wsRes = cleanWhitespace(workingText, options, isCode);
  workingText = wsRes.text;

  // Restore preserved code blocks
  if (options.preserveCodeBlocks && preservedCodeBlocks.length > 0) {
    preservedCodeBlocks.forEach((block, idx) => {
      workingText = workingText.replace(`__KIREI_CODE_BLOCK_${idx}__`, block);
    });
  }

  // Final trim of leading/trailing global text whitespace
  workingText = workingText.trim();

  const afterStats = calculateTextStats(workingText);
  const durationMs = Math.round((performance.now() - startTime) * 10) / 10;

  const fixedIssues: IssueCount = {
    extraSpaces: wsRes.extraSpacesCount,
    brokenLineBreaks: pdfRes.brokenLinesCount,
    blankLines: wsRes.blankLinesCount,
    invisibleChars: invisibleRes.invisibleCharsCount,
    hyphenation: pdfRes.hyphenationCount,
    unicodeArtifacts: unicodeRes.unicodeCount,
    duplicateLines: dupRes.duplicateCount,
    aiPreamble: aiCount,
    htmlMarkdown: htmlMarkdownCount,
    total:
      wsRes.extraSpacesCount +
      pdfRes.brokenLinesCount +
      wsRes.blankLinesCount +
      invisibleRes.invisibleCharsCount +
      pdfRes.hyphenationCount +
      unicodeRes.unicodeCount +
      dupRes.duplicateCount +
      aiCount +
      htmlMarkdownCount,
  };

  const bytesSaved = Math.max(0, beforeStats.bytes - afterStats.bytes);
  const diffParts = computeWordDiff(rawText, workingText);

  return {
    originalText: rawText,
    cleanedText: workingText,
    durationMs,
    isCodeDetected: isCode,
    fixedIssues,
    beforeStats,
    afterStats,
    bytesSaved,
    diffParts,
  };
}

export * from './detector';
export * from './stats';
export * from './diff';
export * from './codeGuard';
