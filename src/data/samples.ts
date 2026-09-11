export interface SampleText {
  id: string;
  titleKey: string;
  category: string;
  preset: string;
  rawText: string;
}

export const SAMPLE_TEXTS: SampleText[] = [
  {
    id: 'pdf-sample',
    titleKey: 'samples.pdf.title',
    category: 'PDF Wrap & Hyphens',
    preset: 'pdf',
    rawText: `Deep neural networks have demonstrated remark-\nable performance in large-scale natural language\nunder-\nstanding tasks across diverse domains.\n\nPage 42 of 108\n\nHowever, the compu-\ntational efficiency of trans-\nformer architectures remains a significant bottleneck\nwhen deployed in real-time edge environments.\n\nIn this work, we propose an opti-\nmized pruning framework that preserves\nrepresentational fidelity while achieving 4.2x speedup.`
  },
  {
    id: 'ai-sample',
    titleKey: 'samples.ai.title',
    category: 'AI Chat Fluff',
    preset: 'ai-chat',
    rawText: `Certainly! Here is the summary you requested:

Copy code
\`\`\`markdown
The architecture follows a distributed event-driven pattern.
Each microservice communicates through an asynchronous message broker.
\`\`\`

****Key Takeaways:****
- High fault tolerance
- Linear scalability
- Zero single point of failure

Hope this helps! Let me know if you need anything else!`
  },
  {
    id: 'raw-code-sample',
    titleKey: 'samples.rawcode.title',
    category: 'Raw Code (Preserved)',
    preset: 'code-safe',
    rawText: `function cleanText(text) {\n    const result = text.trim();\n\n    if (!result) {\n        return "";\n    }\n\n    return result;\n}`
  },
  {
    id: 'messy-web-sample',
    titleKey: 'samples.web.title',
    category: 'Web Copy & Spaces',
    preset: 'all-in-one',
    rawText: `“Design   is   not   just what it looks like and feels like.”\n\n\n\n‘Design is how it works.’  — Steve Jobs\n\nOur modern\u00A0workflow eliminates\u200B invisible formatting\u200C errors,\u00A0\u00A0\nextra    spaces,\tand   broken    line    wraps.\n\n\n\nEnjoy pure, clean text without any manual editing.`
  },
  {
    id: 'scanned-doc-sample',
    titleKey: 'samples.scanned.title',
    category: 'Scanned OCR & Full-Width',
    preset: 'all-in-one',
    rawText: `The agreement entered into on this ２５ｔｈ day of Ａｕｇｕｓｔ ２０２６,\nby and between the parties here-\nunder named, certifies that the specifi-\ncations in Appendix Ａ shall govern all deli-\nverables.\n\n— 12 —\n\nFailure to comply shall constitute a mate-\nrial breach of Section ４．２.`
  }
];
