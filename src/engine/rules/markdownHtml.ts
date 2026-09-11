import { CleaningOptions } from '../../types/rules';

/**
 * Cleans HTML remnants and markdown artifacts.
 */
export function cleanMarkdownHtml(
  text: string,
  options: CleaningOptions
): { text: string; htmlMarkdownCount: number } {
  let htmlMarkdownCount = 0;
  let result = text;

  // 1. Strip HTML tags if enabled
  if (options.stripHtmlTags) {
    // Convert <br>, <br/>, <br /> and </p>, </div> to newlines
    result = result.replace(/<br\s*\/?>/gi, () => {
      htmlMarkdownCount++;
      return '\n';
    });
    result = result.replace(/<\/(p|div|h[1-6]|li)>/gi, () => {
      htmlMarkdownCount++;
      return '\n';
    });

    // Remove remaining HTML tags
    const htmlTagPattern = /<[^>]+>/g;
    const tagMatches = result.match(htmlTagPattern);
    if (tagMatches) {
      htmlMarkdownCount += tagMatches.length;
      result = result.replace(htmlTagPattern, '');
    }

    // Decode basic HTML entities
    const entities: Record<string, string> = {
      '&nbsp;': ' ',
      '&amp;': '&',
      '&lt;': '<',
      '&gt;': '>',
      '&quot;': '"',
      '&#39;': "'",
      '&apos;': "'",
    };

    for (const [entity, replacement] of Object.entries(entities)) {
      const entityRegex = new RegExp(entity, 'gi');
      const matches = result.match(entityRegex);
      if (matches) {
        htmlMarkdownCount += matches.length;
        result = result.replace(entityRegex, replacement);
      }
    }
  }

  // 2. Clean Markdown artifacts if enabled
  if (options.cleanMarkdownArtifacts) {
    // Remove empty bold/italic markers like **** or ____
    const emptyMarkers = /(\*{2,4}|_{2,4})(?=\s|$)/g;
    const mMatches = result.match(emptyMarkers);
    if (mMatches) {
      htmlMarkdownCount += mMatches.length;
      result = result.replace(emptyMarkers, '');
    }

    // Clean stray unclosed code fences at ends
    const orphanFences = /^```\s*$/gm;
    const fMatches = result.match(orphanFences);
    if (fMatches && fMatches.length % 2 !== 0) {
      htmlMarkdownCount++;
    }
  }

  return { text: result, htmlMarkdownCount };
}
