export interface IssueCount {
  extraSpaces: number;
  brokenLineBreaks: number;
  blankLines: number;
  invisibleChars: number;
  hyphenation: number;
  unicodeArtifacts: number;
  duplicateLines: number;
  aiPreamble: number;
  htmlMarkdown: number;
  total: number;
}

export type IssueCategoryKey = keyof Omit<IssueCount, 'total'>;

export interface DetectionResult {
  hasIssues: boolean;
  isCodeDetected: boolean;
  issues: IssueCount;
  detectedCategories: {
    category: IssueCategoryKey;
    label: string;
    count: number;
    color: string;
  }[];
}

export interface TextStatistics {
  characters: number;
  charactersWithoutSpaces: number;
  words: number;
  lines: number;
  paragraphs: number;
  bytes: number;
  readingTimeSeconds: number;
}

export type DiffChangeType = 'equal' | 'added' | 'removed' | 'modified';

export interface DiffPart {
  type: DiffChangeType;
  value: string;
  count?: number;
}

export interface LineDiff {
  type: DiffChangeType;
  leftLineNumber?: number;
  rightLineNumber?: number;
  leftText?: string;
  rightText?: string;
}

export interface CleaningResult {
  originalText: string;
  cleanedText: string;
  durationMs: number;
  isCodeDetected: boolean;
  fixedIssues: IssueCount;
  beforeStats: TextStatistics;
  afterStats: TextStatistics;
  bytesSaved: number;
  diffParts: DiffPart[];
}
