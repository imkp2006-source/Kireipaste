# KIREIPASTE PRODUCT SPECIFICATION & ARCHITECTURE DESIGN

**Version:** 0.1.0  
**Product:** KireiPaste (`kireipaste.com`)  
**Core Tagline:** COPY MESSY. PASTE CLEAN.  
**Supporting Phrase:** Make messy content clean.  

---

## 1. Product Philosophy & Problem Definition

### 1.1 The Core Problem
Modern knowledge workers constantly copy text from diverse digital artifacts:
1. **PDFs & Scans**: Column breaks insert artificial newlines; line wraps insert hard hyphens (`infra-\nstructure`).
2. **AI Chatbots (ChatGPT / Claude)**: Responses prepend conversational filler ("Sure! Here is the summary..."), embed copy-code tags, and wrap text in unwanted markdown fences.
3. **Webpages & Rich Editors**: Invisible zero-width spaces (`\u200B`), non-breaking spaces (`\u00A0`), curly quotes, and stray HTML artifacts poison clipboard data.
4. **Scanned OCR**: Full-width Latin/numbers (`２０２６`), broken quotes, and page numbers disrupt typography.

### 1.2 The KireiPaste Solution
KireiPaste is a dedicated, focused **micro-utility** that solves clipboard pollution in under 15ms.

**The Golden Loop:**
$$\text{PASTE} \longrightarrow \text{DETECT} \longrightarrow \text{KIREI} \longrightarrow \text{REVIEW} \longrightarrow \text{COPY}$$

---

## 2. Brand Identity & Design System

### 2.1 International Flavor
- "Kirei" (綺麗) is Japanese for clean/neat/beautiful.
- "Paste" signifies the user's immediate action.
- The visual presentation is strictly international and modern—subtle Japanese aesthetic cues, not an anime or game theme.

### 2.2 Aesthetic Formula
- **70–80% Modern Utility UI**: High contrast, readable typography (`Plus Jakarta Sans`, `JetBrains Mono`), crisp cards, clear hierarchy.
- **15–20% Dark Atmospheric Ambience**: Dark navy (`#0B0F19`), deep slate (`#111827`), ambient nebula glows (`#8B5CF6`, `#EC4899`).
- **5–10% Playful Pixel Accents**:
  - Signature pixel mascot: "Hōki-chan" (the helpful pixel broom) with reactive expressions (idle, detecting, sweeping, clean).
  - Pixel sparkles, pixel badges, subtle background pixel starfield.

### 2.3 Color Palette Tokens
| Token | Hex | Usage |
|---|---|---|
| `kirei-bg` | `#0B0F19` | Main page backdrop |
| `kirei-surface` | `#111827` | Editor background |
| `kirei-panel` | `#151D2E` | Toolbars, cards, modals |
| `kirei-purple` | `#8B5CF6` | Primary action glow, focus states |
| `kirei-pink` | `#EC4899` | Secondary accent, sparkles |
| `kirei-yellow` | `#FBBF24` | Highlights, mascot wand, warnings |
| `kirei-green` | `#10B981` | Success states, clean checkmarks |
| `kirei-cyan` | `#06B6D4` | PDF indicators, diff highlights |

---

## 3. Engine Architecture & Rules

### 3.1 Modular Rule Architecture
```
src/engine/
├── rules/
│   ├── whitespace.ts      # Multi-space collapse, tab conversion, trailing trim
│   ├── pdf.ts             # Line wrap repair, de-hyphenation, page numbers
│   ├── invisible.ts       # Zero-width spaces, BOM, control codes
│   ├── unicode.ts         # NBSP, curly quotes, full-width ASCII
│   ├── markdownHtml.ts    # HTML tag strip, markdown artifact repair
│   ├── deduplication.ts   # Duplicate line removal
│   └── aiArtifacts.ts     # Preamble, postamble, web copy tags
├── detector.ts            # Non-destructive real-time issue classifier
├── diff.ts                # Longest Common Subsequence (LCS) diff engine
├── stats.ts               # Byte, word, character, and line metrics
└── index.ts               # Pipeline coordinator
```

### 3.2 Key Rules
1. **Never Rewrite Semantics**: KireiPaste never replaces synonyms, never deletes user sentences, and never invents text.
2. **Safe Code Block Guarding**: Code blocks enclosed in ```` ``` ```` are shielded from spacing and hyphenation alterations unless explicitly overridden.
3. **100% Deterministic**: Zero randomness, 100% reproducible results for automated testing.

---

## 4. Internationalization (i18n)

- Translation architecture is decoupled from UI components via `LanguageContext` and JSON dictionaries in `src/i18n/locales/`.
- Supported initial languages:
  - `en`: English (Primary)
  - `ja`: Japanese
  - `es`: Spanish
  - `zh`: Simplified Chinese
  - `fr`: French
  - `de`: German
  - `hi`: Hindi

---

## 5. Strict Product Boundaries (Do's and Don'ts)

### ❌ What KireiPaste is NOT:
- Not a generic AI chat assistant.
- Not a full-blown PDF editor or OCR scanner.
- Not an AI rewriting/paraphrasing tool.
- Not a social network or cloud document storage.

### ✅ What KireiPaste MUST ALWAYS be:
- Instantaneous ($<20\text{ms}$).
- Completely private (in-browser sandbox).
- Visually delightful with smooth 300–600ms transitions.
- Easy to use on desktop, tablet, and mobile.

---

## 6. Roadmap for Future Phases

- **Phase 2**: Native clipboard hotkey extension (Chrome/Edge/Firefox WebExtension).
- **Phase 3**: Optional local WebAssembly OCR for direct screenshot drag-and-drop.
- **Phase 4**: Advanced tabular CSV/Markdown matrix converter.
