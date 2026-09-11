import { DetectionResult, IssueCount } from '../types/cleaner';
import { CleaningOptions } from '../types/rules';
import { isSourceCode } from './codeGuard';

/**
 * Analyzes text in real-time to detect formatting, whitespace, PDF, and Unicode issues accurately.
 * Smartly guards source code indentation, syntax structure, and intentional formatting.
 */
export function detectIssues(text: string, _options?: Partial<CleaningOptions>): DetectionResult {
  if (!text || text.trim().length === 0) {
    return {
      hasIssues: false,
      isCodeDetected: false,
      issues: {
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
      detectedCategories: [],
    };
  }

  const isCode = isSourceCode(text);

  const issues: IssueCount = {
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
  };

  const lines = text.split(/\r?\n/);

  // 1. Extra Spaces (multiple spaces, tabs, trailing spaces)
  if (isCode) {
    // For code: leading spaces/tabs are valid indentations and MUST NOT be flagged as extra spaces.
    // Only flag trailing whitespace at line end, or irregular 3+ spaces in non-indent positions
    for (const line of lines) {
      // Check trailing spaces
      const trailing = line.match(/[ \t]+$/);
      if (trailing) {
        issues.extraSpaces += trailing[0].length;
      }
      // Check internal multiple spaces (excluding leading indent)
      const afterIndent = line.replace(/^[ \t]+/, '');
      const internalMulti = afterIndent.match(/[^\S\r\n]{3,}/g);
      if (internalMulti) {
        internalMulti.forEach((m) => {
          issues.extraSpaces += m.length - 1;
        });
      }
    }
  } else {
    // For normal text: check multi-spaces, tabs, and trailing spaces
    const multiSpaces = text.match(/[^\S\r\n]{2,}/g);
    if (multiSpaces) {
      multiSpaces.forEach((s) => {
        issues.extraSpaces += s.length - 1;
      });
    }
    const tabs = text.match(/\t/g);
    if (tabs) {
      issues.extraSpaces += tabs.length;
    }
    const trailing = text.match(/[ \t]+$/gm);
    if (trailing) {
      issues.extraSpaces += trailing.length;
    }
  }

  // 2. Excess Blank Lines (3 or more consecutive newlines)
  const blankLines = text.match(/\n{3,}/g);
  if (blankLines) {
    blankLines.forEach((b) => {
      issues.blankLines += b.length - 2;
    });
  }

  // 3. PDF Hyphenation (e.g., word-\nlowercase) - skip if code
  if (!isCode) {
    const hyphens = text.match(/([a-zA-Z]{2,})[-–—]\s*\n\s*([a-z]{2,})/g);
    if (hyphens) {
      issues.hyphenation += hyphens.length;
    }
    const spacedHyphens = text.match(/([a-zA-Z]{2,})\s+[-–—]\s*\n\s*([a-z]{2,})/g);
    if (spacedHyphens) {
      issues.hyphenation += spacedHyphens.length;
    }
  }

  // 4. Broken Line Breaks (lines that end without punctuation followed by lowercase or continued text)
  if (!isCode) {
    for (let i = 0; i < lines.length - 1; i++) {
      const cur = lines[i].trim();
      const nxt = lines[i + 1].trim();
      if (cur && nxt) {
        const isListOrHeader =
          /^([*•\-\+>]|\d+[\.\)]|#{1,6}\s+|```)/.test(cur) ||
          /^([*•\-\+>]|\d+[\.\)]|#{1,6}\s+|```)/.test(nxt);
        const endsWithPunc = /[.!?:\;'"”’]\s*$/.test(cur);
        const nxtLower = /^[a-z0-9]/.test(nxt);
        if (!isListOrHeader && !endsWithPunc && (nxtLower || cur.length > 30)) {
          issues.brokenLineBreaks++;
        }
      }
    }
  }

  // 5. Invisible & Zero-Width Characters
  const invisibleMatches = text.match(
    /[\u200B\u200C\u200D\uFEFF\u00AD\u200E\u200F\u2060\u202A-\u202E\u2066-\u2069\u2028\u2029\u0000-\u0008\u000B\u000C\u000E-\u001F]/g
  );
  if (invisibleMatches) {
    issues.invisibleChars += invisibleMatches.length;
  }

  // 6. Unicode Inconsistencies (NBSP, curly quotes, full-width ASCII)
  const unicodeSpaces = text.match(/[\u00A0\u202F\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u3000]/g);
  if (unicodeSpaces) {
    issues.unicodeArtifacts += unicodeSpaces.length;
  }
  const curlyQuotes = text.match(/[“”„«»‘’‚‛`]/g);
  if (curlyQuotes && !isCode) {
    issues.unicodeArtifacts += curlyQuotes.length;
  }
  const fullWidth = text.match(/[\uFF01-\uFF5E]/g);
  if (fullWidth) {
    issues.unicodeArtifacts += fullWidth.length;
  }

  // 7. Duplicate Consecutive Lines
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() !== '' && lines[i].trim() === lines[i - 1].trim()) {
      issues.duplicateLines++;
    }
  }

  // 8. AI Artifacts (preamble / postamble / copy buttons)
  if (!isCode && /^(?:Certainly!|Sure!|Of course!|Here is(?: the)?|Here's(?: the)?|Below is(?: the)?|I'd be happy to help)/im.test(text)) {
    issues.aiPreamble++;
  }
  const copyBtn = text.match(/^\s*(?:Copy\s+code|Copy)\s*$/gmi);
  if (copyBtn) {
    issues.aiPreamble += copyBtn.length;
  }

  // 9. HTML / Markdown artifacts (only for prose, not valid html code blocks)
  if (!isCode) {
    const htmlTags = text.match(/<\/?[a-z][a-z0-9]*\b[^>]*>/gi);
    if (htmlTags) {
      issues.htmlMarkdown += htmlTags.length;
    }
  }

  // Calculate total
  issues.total =
    issues.extraSpaces +
    issues.brokenLineBreaks +
    issues.blankLines +
    issues.invisibleChars +
    issues.hyphenation +
    issues.unicodeArtifacts +
    issues.duplicateLines +
    issues.aiPreamble +
    issues.htmlMarkdown;

  const detectedCategories: DetectionResult['detectedCategories'] = [];

  if (issues.extraSpaces > 0) {
    detectedCategories.push({
      category: 'extraSpaces',
      label: 'Extra spaces',
      count: issues.extraSpaces,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    });
  }
  if (issues.brokenLineBreaks > 0) {
    detectedCategories.push({
      category: 'brokenLineBreaks',
      label: 'Line breaks',
      count: issues.brokenLineBreaks,
      color: 'text-pink-400 bg-pink-500/10 border-pink-500/30',
    });
  }
  if (issues.blankLines > 0) {
    detectedCategories.push({
      category: 'blankLines',
      label: 'Blank lines',
      count: issues.blankLines,
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
    });
  }
  if (issues.hyphenation > 0) {
    detectedCategories.push({
      category: 'hyphenation',
      label: 'PDF hyphenation',
      count: issues.hyphenation,
      color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
    });
  }
  if (issues.invisibleChars > 0) {
    detectedCategories.push({
      category: 'invisibleChars',
      label: 'Invisible chars',
      count: issues.invisibleChars,
      color: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
    });
  }
  if (issues.unicodeArtifacts > 0) {
    detectedCategories.push({
      category: 'unicodeArtifacts',
      label: 'Unicode artifacts',
      count: issues.unicodeArtifacts,
      color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30',
    });
  }
  if (issues.duplicateLines > 0) {
    detectedCategories.push({
      category: 'duplicateLines',
      label: 'Duplicate lines',
      count: issues.duplicateLines,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    });
  }
  if (issues.aiPreamble > 0) {
    detectedCategories.push({
      category: 'aiPreamble',
      label: 'AI artifacts',
      count: issues.aiPreamble,
      color: 'text-violet-400 bg-violet-500/10 border-violet-500/30',
    });
  }
  if (issues.htmlMarkdown > 0) {
    detectedCategories.push({
      category: 'htmlMarkdown',
      label: 'HTML/Markup',
      count: issues.htmlMarkdown,
      color: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
    });
  }

  return {
    hasIssues: issues.total > 0,
    isCodeDetected: isCode,
    issues,
    detectedCategories,
  };
}
