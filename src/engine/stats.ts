import { TextStatistics } from '../types/cleaner';

/**
 * Computes detailed text statistics (characters, words, lines, paragraphs, bytes, reading time).
 */
export function calculateTextStats(text: string): TextStatistics {
  if (!text || text.length === 0) {
    return {
      characters: 0,
      charactersWithoutSpaces: 0,
      words: 0,
      lines: 0,
      paragraphs: 0,
      bytes: 0,
      readingTimeSeconds: 0,
    };
  }

  const characters = text.length;
  const charactersWithoutSpaces = text.replace(/\s/g, '').length;

  // Words (handles non-English and punctuation cleanly)
  const trimmed = text.trim();
  const words = trimmed ? trimmed.split(/\s+/).filter(Boolean).length : 0;

  // Lines
  const lines = text.split(/\r?\n/).length;

  // Paragraphs (non-empty blocks separated by double newlines or single newlines)
  const paragraphs = text
    .split(/\n\s*\n/)
    .filter((p) => p.trim().length > 0).length;

  // UTF-8 Bytes
  const bytes = new Blob([text]).size;

  // Reading time (200 words per minute => 3.33 words/sec)
  const readingTimeSeconds = Math.max(1, Math.ceil(words / 3.33));

  return {
    characters,
    charactersWithoutSpaces,
    words,
    lines,
    paragraphs: paragraphs || (text.trim() ? 1 : 0),
    bytes,
    readingTimeSeconds,
  };
}
