import { CleaningOptions } from '../../types/rules';

/**
 * Cleans AI-specific conversational preamble/postamble and UI copy remnants.
 */
export function cleanAiArtifacts(
  text: string,
  options: CleaningOptions
): { text: string; aiCount: number } {
  let aiCount = 0;
  let result = text;

  if (!options.cleanAiPreamble) {
    return { text: result, aiCount: 0 };
  }

  // 1. Remove common AI preambles (case-insensitive multiline)
  const preamblePatterns = [
    /^(?:Certainly!*|Sure!*|Of course!*|Here is(?: the)?|Here's(?: the)?|Below is(?: the)?|Here is what you requested:?|Certainly, here is the:?)[^\n]*\n+/i,
    /^(?:I'd be happy to help with that\.?|As an AI language model,[^\n]*)\n+/i,
  ];

  for (const pattern of preamblePatterns) {
    if (pattern.test(result)) {
      aiCount++;
      result = result.replace(pattern, '');
    }
  }

  // 2. Remove stray "Copy code" / "Copy" lines from web code blocks
  const copyButtonPattern = /^\s*(?:Copy\s+code|Copy)\s*$/gmi;
  const copyMatches = result.match(copyButtonPattern);
  if (copyMatches) {
    aiCount += copyMatches.length;
    result = result.replace(copyButtonPattern, '');
  }

  // 3. Remove common AI postambles (can be single or multiple closing remarks)
  const postamblePattern = /(?:\n+|^)(?:(?:Hope this helps!*|Let me know if you need [^\n]*|Feel free to ask [^\n]*|Is there anything else [^\n]*|Please let me know if [^\n]*)\s*)+$/i;

  if (postamblePattern.test(result)) {
    aiCount++;
    result = result.replace(postamblePattern, '');
  }

  // 4. Unwrap outermost single markdown code fence if it wraps the entire text
  const outerFencePattern = /^```(?:[a-zA-Z0-9_-]+)?\r?\n([\s\S]*?)\r?\n```\s*$/;
  const fenceMatch = result.match(outerFencePattern);
  if (fenceMatch && fenceMatch[1]) {
    aiCount++;
    result = fenceMatch[1];
  }

  return { text: result, aiCount };
}
