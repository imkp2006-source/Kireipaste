import { CleaningOptions } from '../../types/rules';

/**
 * Removes zero-width characters, BOM, invisible formatting marks, and control codes.
 */
export function cleanInvisibleChars(
  text: string,
  options: CleaningOptions
): { text: string; invisibleCharsCount: number } {
  let invisibleCharsCount = 0;
  let result = text;

  if (!options.removeZeroWidthChars) {
    return { text: result, invisibleCharsCount: 0 };
  }

  // 1. Convert Unicode line/paragraph separators to standard newlines
  result = result.replace(/\u2028/g, () => {
    invisibleCharsCount++;
    return '\n';
  });
  result = result.replace(/\u2029/g, () => {
    invisibleCharsCount++;
    return '\n\n';
  });

  // 2. Remove Zero-width spaces, BOM, joiners, directional isolates, soft hyphens
  // \u200B: ZWSP
  // \u200C: ZWNJ
  // \u200D: ZWJ
  // \uFEFF: BOM
  // \u00AD: Soft Hyphen
  // \u200E, \u200F: LTR/RTL marks
  // \u2060: Word Joiner
  // \u202A-\u202E: Directional markers
  // \u2066-\u2069: Directional isolates
  const invisiblePattern = /[\u200B\u200C\u200D\uFEFF\u00AD\u200E\u200F\u2060\u202A-\u202E\u2066-\u2069]/g;
  const matches = result.match(invisiblePattern);
  if (matches) {
    invisibleCharsCount += matches.length;
    result = result.replace(invisiblePattern, '');
  }

  // 3. Remove non-printable control characters (excluding \t, \n, \r)
  const controlCharsPattern = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;
  const ctrlMatches = result.match(controlCharsPattern);
  if (ctrlMatches) {
    invisibleCharsCount += ctrlMatches.length;
    result = result.replace(controlCharsPattern, '');
  }

  return { text: result, invisibleCharsCount };
}
