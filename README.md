# 🧹 KireiPaste

> **COPY MESSY. PASTE CLEAN.**  
> *Make messy content clean.*

KireiPaste is a focused, production-grade micro-utility for instantly cleaning messy copied content from PDFs, AI chatbots, websites, and scanned documents.

---

## 🌟 Why KireiPaste?

When you copy text from PDFs, academic papers, ChatGPT, code snippets, or scanned OCR documents, you get:
- PDF line-end hyphenation (`imple- \n mentation`)
- Hard-wrapped column breaks in the middle of sentences
- Multiple irregular spaces, tabs, and trailing junk
- Zero-width spaces (`\u200B`), BOM (`\uFEFF`), and invisible control codes
- AI conversational fluff ("Certainly! Here is...", "Copy code", stray code fences)
- Unwanted HTML remnants (`<p>`, `<br>`, `&nbsp;`)
- Full-width ASCII numbers & letters (`２０２６`, `ＡＢＣ`)

**KireiPaste fixes these problems cleanly in under 15ms without changing your actual words or hallucinating.**

---

## ✨ Features

- **100% Client-Side Privacy**: Text is processed in-memory directly in your browser. Zero cloud calls, zero logs, zero telemetry.
- **Zero AI Hallucinations**: Uses a deterministic, unit-tested regex and Unicode normalization pipeline.
- **Smart Live Issue Detection**: Scans clipboard text in real time and classifies formatting bugs before you click clean.
- **Interactive Diff Inspection**: Visual character, word, and side-by-side line diff highlighting added, removed, and repaired tokens.
- **Tailored Mode Presets**:
  - `Smart All-in-One`: General copy-paste, websites, notes.
  - `PDF Line & Hyphen Fix`: Reconnects column wraps and hyphenated words.
  - `AI Chat Clean`: Strips preambles, outer code block wraps, and copy button artifacts.
  - `Pure Plain Text`: Strips all HTML/Markdown formatting.
  - `Code & Markdown Safe`: Preserves indentations and code blocks while destroying invisible bugs.
- **Custom Rule Engine**: Toggle 15+ granular cleaning rules according to your workflow.
- **Internationalization (i18n)**: Multi-language support (English, Japanese, Spanish, Chinese, French, German, Hindi).
- **Modern Dark Atmospheric UI**: Controlled pixel-art aesthetic (subtle broom mascot "Hōki-chan", pixel sparkles, retro grid scenery, responsive mobile stack).

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ (tested on Node.js 20 & 24)
- npm or pnpm

### Installation

```bash
# Clone or extract repository
cd kireipaste

# Install dependencies
npm install

# Start Vite development server
npm run dev
```

### Production Build

```bash
# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 📁 Project Structure

```
kireipaste/
├── public/
│   ├── favicon.svg            # Pixel broom & sparkle vector icon
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── cleaner/           # Input, Output, Presets, Detection, Diff, Summary
│   │   ├── layout/            # Navbar, Footer, LanguageSelector
│   │   ├── pixel/             # PixelMascot, PixelSparkle, PixelBadge, PixelGridScenery
│   │   ├── sections/          # Hero, FeatureModes, RulesShowcase, WhyKireiPaste, HowItWorks
│   │   └── ui/                # Modal, Toast
│   ├── data/
│   │   ├── presets.ts         # Predefined cleaning modes
│   │   └── samples.ts         # Real-world messy text samples
│   ├── engine/
│   │   ├── detector.ts        # Live real-time issue classification
│   │   ├── diff.ts            # Fast LCS word & line diff generator
│   │   ├── stats.ts           # Character, word, line & byte metrics
│   │   ├── index.ts           # Main pipeline coordinator
│   │   └── rules/             # Modular rule implementations
│   │       ├── aiArtifacts.ts
│   │       ├── deduplication.ts
│   │       ├── invisible.ts
│   │       ├── markdownHtml.ts
│   │       ├── pdf.ts
│   │       ├── unicode.ts
│   │       └── whitespace.ts
│   ├── i18n/
│   │   ├── LanguageContext.tsx
│   │   └── locales/           # EN, JA, ES, ZH, FR, DE, HI translations
│   ├── types/                 # TypeScript type definitions
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Ctrl + Enter` / `⌘ + Enter` | ✨ Clean messy text (**KIREI IT**) |
| `Ctrl + Shift + C` / `⌘ + Shift + C` | Copy clean output to clipboard |
| `Ctrl + ,` / `⌘ + ,` | Open Custom Rule Engine settings |
| `Esc` | Dismiss modals and dialogs |

---

## 📄 License

MIT © [KireiPaste](https://kireipaste.com)
