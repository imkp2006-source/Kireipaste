import { CleaningOptions } from '../../types/rules';
import { isSourceCode } from '../codeGuard';

/**
 * Repairs PDF hyphenation, unwanted hard-wrapped line breaks, and page artifact lines.
 * Never destroys code structure or intentional programming line breaks.
 */
export function cleanPdfArtifacts(
  text: string,
  options: CleaningOptions,
  isCodeInput?: boolean
): { text: string; hyphenationCount: number; brokenLinesCount: number } {
  let hyphenationCount = 0;
  let brokenLinesCount = 0;
  let result = text;

  const isCode = isCodeInput ?? isSourceCode(text);

  // If text is source code, skip aggressive PDF reflows
  if (isCode) {
    return { text: result, hyphenationCount: 0, brokenLinesCount: 0 };
  }

  // 1. Fix PDF hyphenation at line breaks: "imple-\nmentation" -> "implementation"
  if (options.fixPdfHyphenation) {
    // Pattern 1: word-\nword (e.g., "algo-\nrithm" or "inter-\n\nface" or "auto-\n   mation")
    const hyphenRegex = /([a-zA-Z]{2,})[-–—]\s*\n\s*([a-z]{2,})/g;
    const matches = result.match(hyphenRegex);
    if (matches) {
      hyphenationCount += matches.length;
      result = result.replace(hyphenRegex, '$1$2');
    }

    // Pattern 2: word - \n word with spaces
    const spaceHyphenRegex = /([a-zA-Z]{2,})\s+[-–—]\s*\n\s*([a-z]{2,})/g;
    const spaceMatches = result.match(spaceHyphenRegex);
    if (spaceMatches) {
      hyphenationCount += spaceMatches.length;
      result = result.replace(spaceHyphenRegex, '$1$2');
    }
  }

  // 2. Remove page artifacts (Page X of Y, standalone page numbers between blank lines)
  if (options.removePageArtifacts) {
    const pagePatterns = [
      /\n\s*(?:Page\s+\d+(?:\s+of\s+\d+)?|\d+\s*\/\s*\d+|[-—–]\s*\d+\s*[-—–])\s*\n/gi,
      /\n\s*\[\s*Page\s+\d+\s*\]\s*\n/gi,
    ];

    for (const pattern of pagePatterns) {
      const pageMatches = result.match(pattern);
      if (pageMatches) {
        brokenLinesCount += pageMatches.length;
        result = result.replace(pattern, '\n');
      }
    }
  }

  // 3. Fix broken PDF line breaks within paragraphs
  if (options.fixPdfLineBreaks) {
    const lines = result.split('\n');
    const processedLines: string[] = [];

    for (let i = 0; i < lines.length; i++) {
      const current = lines[i];
      const next = i < lines.length - 1 ? lines[i + 1] : null;

      if (next === null) {
        processedLines.push(current);
        continue;
      }

      const trimmedCurrent = current.trim();
      const trimmedNext = next.trim();

      // Skip if either is empty (preserving paragraph separations)
      if (!trimmedCurrent || !trimmedNext) {
        processedLines.push(current);
        continue;
      }

      // Check if current line is a bullet/list/header/code guard
      const isListOrHeader =
        /^([*•\-\+>]|\d+[\.\)]|#{1,6}\s+|```)/.test(trimmedCurrent) ||
        /^([*•\-\+>]|\d+[\.\)]|#{1,6}\s+|```)/.test(trimmedNext);

      // Check if current line ends with a sentence boundary (. ! ? : ; or closing quote)
      const endsWithPunctuation = /[.!?:\;'"”’]\s*$/.test(trimmedCurrent);

      // Check if next line looks like a continuation
      const nextStartsLower = /^[a-z0-9]/.test(trimmedNext);
      const nextStartsCapitalSentence = /^[A-Z]/.test(trimmedNext);

      if (!isListOrHeader && !endsWithPunctuation) {
        if (nextStartsLower || (!nextStartsCapitalSentence && trimmedCurrent.length > 25)) {
          // Join current and next line with a single space
          lines[i + 1] = trimmedCurrent + ' ' + trimmedNext;
          brokenLinesCount++;
          continue;
        }
      }

      processedLines.push(current);
    }

    result = processedLines.join('\n');
  }

  return { text: result, hyphenationCount, brokenLinesCount };
}
