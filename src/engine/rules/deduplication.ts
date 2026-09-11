import { CleaningOptions } from '../../types/rules';

/**
 * Removes adjacent duplicate lines.
 */
export function cleanDuplicateLines(
  text: string,
  options: CleaningOptions
): { text: string; duplicateCount: number } {
  let duplicateCount = 0;
  let result = text;

  if (!options.removeDuplicateLines) {
    return { text: result, duplicateCount: 0 };
  }

  const lines = result.split('\n');
  const uniqueLines: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const current = lines[i];
    const prev = i > 0 ? lines[i - 1] : null;

    // If consecutive identical lines (ignoring whitespace differences or exact)
    if (prev !== null && current.trim() !== '' && current.trim() === prev.trim()) {
      duplicateCount++;
      continue;
    }

    uniqueLines.push(current);
  }

  return { text: uniqueLines.join('\n'), duplicateCount };
}
