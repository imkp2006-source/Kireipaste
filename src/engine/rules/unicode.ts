import { CleaningOptions } from '../../types/rules';

/**
 * Normalizes Unicode spaces, smart quotes, dashes, and full-width ASCII characters.
 */
export function cleanUnicodeArtifacts(
  text: string,
  options: CleaningOptions
): { text: string; unicodeCount: number } {
  let unicodeCount = 0;
  let result = text;

  // 1. Normalize non-breaking and unusual Unicode spaces
  if (options.normalizeNonBreakingSpaces) {
    // \u00A0: NBSP
    // \u202F: Narrow NBSP
    // \u2002: En space
    // \u2003: Em space
    // \u2004-\u200A: Various width spaces
    // \u2007: Figure space
    const unicodeSpacePattern = /[\u00A0\u202F\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A]/g;
    const matches = result.match(unicodeSpacePattern);
    if (matches) {
      unicodeCount += matches.length;
      result = result.replace(unicodeSpacePattern, ' ');
    }
  }

  // 2. Normalize Quotes
  if (options.normalizeQuotes === 'straight') {
    // Double quotes: “ ” „ « » ‹ ›
    const doubleQuotePattern = /[“”„«»]/g;
    const dMatches = result.match(doubleQuotePattern);
    if (dMatches) {
      unicodeCount += dMatches.length;
      result = result.replace(doubleQuotePattern, '"');
    }

    // Single quotes & apostrophes: ‘ ’ ‚ ‛ `
    const singleQuotePattern = /[‘’‚‛`]/g;
    const sMatches = result.match(singleQuotePattern);
    if (sMatches) {
      unicodeCount += sMatches.length;
      result = result.replace(singleQuotePattern, "'");
    }
  }

  // 3. Normalize Full-Width ASCII characters (e.g. ｈｅｌｌｏ １２３ -> hello 123)
  if (options.normalizeFullWidth) {
    const fullWidthPattern = /[\uFF01-\uFF5E]/g;
    const fwMatches = result.match(fullWidthPattern);
    if (fwMatches) {
      unicodeCount += fwMatches.length;
      result = result.replace(fullWidthPattern, (ch) => {
        return String.fromCharCode(ch.charCodeAt(0) - 0xFEE0);
      });
    }
    // Full-width space \u3000 to standard space
    const fwSpacePattern = /\u3000/g;
    const fwsMatches = result.match(fwSpacePattern);
    if (fwsMatches) {
      unicodeCount += fwsMatches.length;
      result = result.replace(fwSpacePattern, ' ');
    }
  }

  // 4. Normalize Dashes if requested
  if (options.normalizeDashes === 'standard') {
    const dashPattern = /[—–]/g;
    const dashMatches = result.match(dashPattern);
    if (dashMatches) {
      unicodeCount += dashMatches.length;
      result = result.replace(dashPattern, '-');
    }
  }

  return { text: result, unicodeCount };
}
