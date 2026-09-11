/**
 * Code Guard: Heuristics to detect source code, JSON, markup, and structured programming languages.
 * Ensures indentation, braces, and line breaks in code are 100% preserved.
 */

export function isSourceCode(text: string): boolean {
  if (!text || text.trim().length === 0) return false;

  // 1. Explicit markdown code fences
  if (/```[\s\S]*?```/.test(text)) return true;

  const rawLines = text.split(/\r?\n/);
  const nonEmptyLines = rawLines.map((l) => l.trim()).filter(Boolean);
  if (nonEmptyLines.length === 0) return false;

  let codeSignalScore = 0;

  for (const line of nonEmptyLines) {
    // Ends with structural punctuation: {, }, ;, , (for params/objects), =>, ->
    if (/[\{\}\;]\s*$/.test(line)) {
      codeSignalScore += 2;
    } else if (/(?:=>|->|\=\s*\{|\[\]|\{\})\s*$/.test(line)) {
      codeSignalScore += 2;
    }

    // Programming declarations / keywords at line start
    if (
      /^(?:function\b|const\b|let\b|var\b|def\b|class\b|import\b|export\b|from\b|return\b|if\s*\(|else\b|for\s*\(|while\s*\(|switch\s*\(|case\b|public\b|private\b|protected\b|static\b|async\b|await\b|fn\b|pub\b|impl\b|struct\b|interface\b|type\b|package\b|namespace\b|using\b|include\b)/i.test(
        line
      )
    ) {
      codeSignalScore += 2.5;
    }

    // Common syntax operators & calls: ===, !==, ++, --, +=, -=, console.log, print(
    if (/(?:===|!==|=>|\+=|-=|\*=|&&|\|\||::|\$\{)/.test(line)) {
      codeSignalScore += 1.5;
    }
    if (/(?:console\.(?:log|warn|error|info)|print\(|println!|System\.out|std::|logger\.)/.test(line)) {
      codeSignalScore += 2.5;
    }

    // JSON line: "property": value
    if (/^"[a-zA-Z0-9_$-]+"\s*:\s*[\{\[\"0-9a-zA-Z]/.test(line)) {
      codeSignalScore += 2;
    }

    // HTML / JSX tags: <div>, <script>, </...>, <Component ... />
    if (/^<(?:\/?[a-zA-Z0-9_-]+|\!DOCTYPE)[^>]*>/.test(line) || /<\/[a-zA-Z0-9_-]+>$/.test(line)) {
      codeSignalScore += 2;
    }

    // Code comments: //, /*, #, <!--
    if (/^(?:\/\/|\/\*|\*|#\s+[a-zA-Z]|<!--)/.test(line)) {
      codeSignalScore += 1.5;
    }

    // SQL statements
    if (/^(?:SELECT|INSERT\s+INTO|UPDATE|DELETE\s+FROM|CREATE\s+TABLE|ALTER\s+TABLE|DROP\s+TABLE)\b/i.test(line)) {
      codeSignalScore += 3;
    }
  }

  // Short snippet (1-3 lines) with strong signal
  if (nonEmptyLines.length <= 3) {
    return codeSignalScore >= 2;
  }

  // Multi-line code check
  const normalizedScore = codeSignalScore / nonEmptyLines.length;
  return normalizedScore >= 0.65 || codeSignalScore >= 4;
}

/**
 * Checks if a specific line should be protected as code/indented structure.
 */
export function isCodeLine(line: string, isTextOverallCode: boolean): boolean {
  if (isTextOverallCode) return true;
  if (!line || line.trim().length === 0) return false;

  const trimmed = line.trim();

  // Has indentation (2+ spaces or tab at start) and code-like tokens
  const hasIndent = /^[ \t]{2,}/.test(line);
  const hasCodeTokens =
    /[\{\}\;\=]/.test(trimmed) ||
    /^(?:return|const|let|var|if|else|function|def|import|export|class)\b/.test(trimmed);

  return hasIndent && hasCodeTokens;
}
