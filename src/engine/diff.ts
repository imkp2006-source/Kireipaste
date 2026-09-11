import { DiffPart, LineDiff } from '../types/cleaner';

/**
 * Computes word-level diff between original and cleaned text for interactive visual inspection.
 */
export function computeWordDiff(originalText: string, cleanedText: string): DiffPart[] {
  if (originalText === cleanedText) {
    return [{ type: 'equal', value: originalText }];
  }

  // Tokenize by words and whitespace delimiters
  const tokenRegex = /(\s+|[^\s\w]+|\w+)/g;
  const originalTokens = originalText.match(tokenRegex) || [];
  const cleanedTokens = cleanedText.match(tokenRegex) || [];

  const m = originalTokens.length;
  const n = cleanedTokens.length;

  // For very long texts, limit token count to prevent excessive computation
  if (m > 2000 || n > 2000) {
    return [
      { type: 'removed', value: originalText.slice(0, 1000) + '...' },
      { type: 'added', value: cleanedText.slice(0, 1000) + '...' },
    ];
  }

  // LCS Matrix
  const matrix: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (originalTokens[i - 1] === cleanedTokens[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1] + 1;
      } else {
        matrix[i][j] = Math.max(matrix[i - 1][j], matrix[i][j - 1]);
      }
    }
  }

  // Backtrack to find diff
  const rawDiff: DiffPart[] = [];
  let i = m;
  let j = n;

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && originalTokens[i - 1] === cleanedTokens[j - 1]) {
      rawDiff.unshift({ type: 'equal', value: originalTokens[i - 1] });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || matrix[i][j - 1] >= matrix[i - 1][j])) {
      rawDiff.unshift({ type: 'added', value: cleanedTokens[j - 1] });
      j--;
    } else if (i > 0 && (j === 0 || matrix[i][j - 1] < matrix[i - 1][j])) {
      rawDiff.unshift({ type: 'removed', value: originalTokens[i - 1] });
      i--;
    }
  }

  // Merge consecutive tokens of same type
  const mergedDiff: DiffPart[] = [];
  for (const part of rawDiff) {
    if (mergedDiff.length > 0 && mergedDiff[mergedDiff.length - 1].type === part.type) {
      mergedDiff[mergedDiff.length - 1].value += part.value;
    } else {
      mergedDiff.push({ ...part });
    }
  }

  return mergedDiff;
}

/**
 * Computes side-by-side line diff for before/after comparison.
 */
export function computeLineDiff(originalText: string, cleanedText: string): LineDiff[] {
  const originalLines = originalText.split('\n');
  const cleanedLines = cleanedText.split('\n');

  const maxLines = Math.max(originalLines.length, cleanedLines.length);
  const lineDiffs: LineDiff[] = [];

  for (let i = 0; i < maxLines; i++) {
    const left = originalLines[i];
    const right = cleanedLines[i];

    if (left !== undefined && right !== undefined) {
      if (left === right) {
        lineDiffs.push({
          type: 'equal',
          leftLineNumber: i + 1,
          rightLineNumber: i + 1,
          leftText: left,
          rightText: right,
        });
      } else {
        lineDiffs.push({
          type: 'modified',
          leftLineNumber: i + 1,
          rightLineNumber: i + 1,
          leftText: left,
          rightText: right,
        });
      }
    } else if (left !== undefined) {
      lineDiffs.push({
        type: 'removed',
        leftLineNumber: i + 1,
        leftText: left,
      });
    } else if (right !== undefined) {
      lineDiffs.push({
        type: 'added',
        rightLineNumber: i + 1,
        rightText: right,
      });
    }
  }

  return lineDiffs;
}
