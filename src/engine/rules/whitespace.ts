import { CleaningOptions } from '../../types/rules';
import { isSourceCode } from '../codeGuard';

export interface RuleExecutionResult {
  text: string;
  count: number;
}

/**
 * Normalizes multiple consecutive spaces, tabs, and line endings.
 * Safely guards code indentations and structure.
 */
export function cleanWhitespace(
  text: string,
  options: CleaningOptions,
  isCodeInput?: boolean
): { text: string; extraSpacesCount: number; blankLinesCount: number } {
  let extraSpacesCount = 0;
  let blankLinesCount = 0;
  let result = text;

  const isCode = isCodeInput ?? isSourceCode(text);

  // 1. Normalize line endings to \n
  result = result.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  // 2. Normalize tabs if enabled (only if not preserving code or if tab normalization requested)
  if (options.normalizeTabs && !isCode) {
    const tabReplacement = ' '.repeat(options.tabSize || 2);
    const tabMatches = result.match(/\t/g);
    if (tabMatches) {
      extraSpacesCount += tabMatches.length;
      result = result.replace(/\t/g, tabReplacement);
    }
  }

  // 3. Trim trailing line ends (safe for both prose and code)
  if (options.trimLineEnds) {
    const trailingMatches = result.match(/[ \t]+$/gm);
    if (trailingMatches) {
      extraSpacesCount += trailingMatches.length;
      result = result.replace(/[ \t]+$/gm, '');
    }
  }

  // 4. Normalize multiple spaces within lines (preserving indentation and newlines)
  if (options.normalizeSpaces) {
    if (isCode) {
      // For code: preserve leading indentation! Only normalize multiple spaces in inline tokens (e.g. `let    x = 10;`)
      const lines = result.split('\n');
      const processedLines = lines.map((line) => {
        const leadingIndentMatch = line.match(/^[ \t]+/);
        const indent = leadingIndentMatch ? leadingIndentMatch[0] : '';
        const content = line.slice(indent.length);

        // Check 3+ consecutive spaces in non-indent content (e.g. accidental triple space between identifiers)
        const multiMatches = content.match(/[^\S\r\n]{3,}/g);
        if (multiMatches) {
          multiMatches.forEach((m) => {
            extraSpacesCount += m.length - 1;
          });
          return indent + content.replace(/[^\S\r\n]{3,}/g, ' ');
        }
        return line;
      });
      result = processedLines.join('\n');
    } else {
      // For normal prose: collapse multiple consecutive horizontal spaces to a single space
      const multiSpaceMatches = result.match(/[^\S\r\n]{2,}/g);
      if (multiSpaceMatches) {
        multiSpaceMatches.forEach((match) => {
          extraSpacesCount += match.length - 1;
        });
        result = result.replace(/[^\S\r\n]{2,}/g, ' ');
      }
    }
  }

  // 5. Remove excess blank lines
  if (options.removeExcessBlankLines) {
    const maxAllowed = options.maxBlankLines !== undefined ? options.maxBlankLines : 1;
    // maxAllowed = 1 means at most 1 empty line between text = \n\n
    // regex for (maxAllowed + 2) or more consecutive newlines
    const regex = new RegExp(`\\n{${maxAllowed + 2},}`, 'g');
    const targetReplacement = '\n'.repeat(maxAllowed + 1);

    const blankLineMatches = result.match(regex);
    if (blankLineMatches) {
      blankLineMatches.forEach((m) => {
        blankLinesCount += m.length - (maxAllowed + 1);
      });
      result = result.replace(regex, targetReplacement);
    }
  }

  return { text: result, extraSpacesCount, blankLinesCount };
}
