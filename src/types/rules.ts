export type QuoteStyle = 'keep' | 'straight' | 'smart';
export type DashStyle = 'keep' | 'standard';

export interface CleaningOptions {
  // Whitespace rules
  normalizeSpaces: boolean;
  normalizeTabs: boolean;
  tabSize: number;
  trimLineEnds: boolean;
  removeExcessBlankLines: boolean;
  maxBlankLines: number;

  // PDF & Scan rules
  fixPdfHyphenation: boolean;
  fixPdfLineBreaks: boolean;
  removePageArtifacts: boolean;

  // Invisible & Unicode rules
  removeZeroWidthChars: boolean;
  normalizeNonBreakingSpaces: boolean;
  normalizeQuotes: QuoteStyle;
  normalizeDashes: DashStyle;
  normalizeFullWidth: boolean;

  // Markup & AI rules
  stripHtmlTags: boolean;
  cleanMarkdownArtifacts: boolean;
  cleanAiPreamble: boolean;
  removeDuplicateLines: boolean;

  // Preservation guards
  preserveCodeBlocks: boolean;
  preserveLists: boolean;
}

export type PresetId = 'all-in-one' | 'pdf' | 'ai-chat' | 'plain-text' | 'code-safe' | 'data-table';

export interface CleaningPreset {
  id: PresetId;
  nameKey: string;
  descriptionKey: string;
  icon: string;
  badge?: string;
  options: Partial<CleaningOptions>;
}

export const DEFAULT_CLEANING_OPTIONS: CleaningOptions = {
  normalizeSpaces: true,
  normalizeTabs: true,
  tabSize: 2,
  trimLineEnds: true,
  removeExcessBlankLines: true,
  maxBlankLines: 1,

  fixPdfHyphenation: true,
  fixPdfLineBreaks: true,
  removePageArtifacts: true,

  removeZeroWidthChars: true,
  normalizeNonBreakingSpaces: true,
  normalizeQuotes: 'straight',
  normalizeDashes: 'keep',
  normalizeFullWidth: true,

  stripHtmlTags: false,
  cleanMarkdownArtifacts: false,
  cleanAiPreamble: false,
  removeDuplicateLines: false,

  preserveCodeBlocks: true,
  preserveLists: true,
};
