import React, { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../../i18n/LanguageContext';
import { useToast } from '../ui/Toast';
import { cleanText, detectIssues, calculateTextStats } from '../../engine';
import { CleaningOptions, DEFAULT_CLEANING_OPTIONS, PresetId } from '../../types/rules';
import { CLEANING_PRESETS } from '../../data/presets';
import { CleaningResult, DetectionResult } from '../../types/cleaner';
import { InputEditor } from './InputEditor';
import { OutputEditor } from './OutputEditor';
import { SmartDetectionBar } from './SmartDetectionBar';
import { ActionCenter } from './ActionCenter';
import { CleanSummaryBanner } from './CleanSummaryBanner';
import { PresetSelector } from './PresetSelector';
import { RuleSettingsModal } from './RuleSettingsModal';
import { MascotState } from '../pixel/PixelMascot';

interface CleanerContainerProps {
  initialText?: string;
  initialPreset?: PresetId;
  onMascotStateChange?: (state: MascotState) => void;
  isRuleModalOpen: boolean;
  onCloseRuleModal: () => void;
  onOpenRuleModal: () => void;
}

export const CleanerContainer: React.FC<CleanerContainerProps> = ({
  initialText = '',
  initialPreset = 'all-in-one',
  onMascotStateChange,
  isRuleModalOpen,
  onCloseRuleModal,
  onOpenRuleModal,
}) => {
  const { t } = useLanguage();
  const { showToast } = useToast();

  const [inputText, setInputText] = useState(initialText);
  const [outputText, setOutputText] = useState('');
  const [cleaningHistory, setCleaningHistory] = useState<{ input: string; output: string } | null>(null);
  const [activePreset, setActivePreset] = useState<PresetId>(initialPreset);
  const [cleaningOptions, setCleaningOptions] = useState<CleaningOptions>(DEFAULT_CLEANING_OPTIONS);
  const [isCleaning, setIsCleaning] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [lastResult, setLastResult] = useState<CleaningResult | null>(null);
  const [detection, setDetection] = useState<DetectionResult>(() =>
    detectIssues(initialText, DEFAULT_CLEANING_OPTIONS)
  );

  // Sync initial text if passed externally
  useEffect(() => {
    if (initialText) {
      setInputText(initialText);
    }
  }, [initialText]);

  // Sync initial preset
  useEffect(() => {
    if (initialPreset && initialPreset !== activePreset) {
      handleSelectPreset(initialPreset);
    }
  }, [initialPreset]);

  // Live detection on input change
  useEffect(() => {
    const res = detectIssues(inputText, cleaningOptions);
    setDetection(res);

    if (onMascotStateChange) {
      if (res.hasIssues) {
        onMascotStateChange('detecting');
      } else {
        onMascotStateChange('idle');
      }
    }
  }, [inputText, cleaningOptions, onMascotStateChange]);

  const handleSelectPreset = (presetId: PresetId) => {
    setActivePreset(presetId);
    const preset = CLEANING_PRESETS.find((p) => p.id === presetId);
    if (preset) {
      setCleaningOptions({
        ...DEFAULT_CLEANING_OPTIONS,
        ...preset.options,
      });
      showToast(`Switched to ${t(preset.nameKey)} preset`, 'info');
    }
  };

  const handleClean = useCallback(() => {
    if (!inputText || !inputText.trim()) {
      showToast('Please paste some text first', 'info');
      return;
    }

    setIsCleaning(true);
    if (onMascotStateChange) onMascotStateChange('cleaning');

    // Run deterministic engine with subtle 300ms transition for satisfying user feedback
    setTimeout(() => {
      const result = cleanText(inputText, cleaningOptions);

      setCleaningHistory({ input: inputText, output: outputText });
      setOutputText(result.cleanedText);
      setLastResult(result);
      setIsCleaning(false);

      if (onMascotStateChange) onMascotStateChange('clean');

      if (result.fixedIssues.total > 0) {
        showToast(`✨ Cleaned ${result.fixedIssues.total} issues in ${result.durationMs}ms!`, 'success');
        // Gentle micro confetti celebration
        try {
          confetti({
            particleCount: 28,
            spread: 50,
            origin: { y: 0.6 },
            colors: ['#8B5CF6', '#EC4899', '#FBBF24', '#06B6D4'],
            disableForReducedMotion: true,
          });
        } catch {
          // Ignore
        }
      } else {
        showToast('Text is already clean ✓', 'info');
      }
    }, 280);
  }, [inputText, outputText, cleaningOptions, onMascotStateChange, showToast, t]);

  // Global shortcut (Ctrl/Cmd + Enter to clean)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleClean();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleClean]);

  const handlePasteClipboard = async () => {
    try {
      const clipText = await navigator.clipboard.readText();
      if (clipText) {
        setInputText(clipText);
        showToast('Pasted from clipboard', 'info');
      }
    } catch {
      showToast('Clipboard access was blocked by browser. Please paste manually.', 'error');
    }
  };

  const handleCopy = async () => {
    const target = outputText || inputText;
    if (!target) return;

    try {
      await navigator.clipboard.writeText(target);
      setIsCopied(true);
      showToast(t('cleaner.copied'), 'success');
      setTimeout(() => setIsCopied(false), 2200);
    } catch {
      showToast('Could not copy to clipboard', 'error');
    }
  };

  const handleDownload = (format: 'txt' | 'md') => {
    const target = outputText || inputText;
    if (!target) return;

    const mime = format === 'md' ? 'text/markdown' : 'text/plain';
    const blob = new Blob([target], { type: `${mime};charset=utf-8` });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kirei-cleaned.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(`Downloaded clean text as .${format}`, 'success');
  };

  const handleUndo = () => {
    if (cleaningHistory) {
      setInputText(cleaningHistory.input);
      setOutputText(cleaningHistory.output);
      setLastResult(null);
      showToast('Undone to previous state', 'info');
    }
  };

  const inputStats = calculateTextStats(inputText);

  return (
    <div id="cleaner-section" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-4">
      {/* Preset Selector */}
      <PresetSelector
        activePreset={activePreset}
        onSelectPreset={handleSelectPreset}
        onOpenCustomRules={onOpenRuleModal}
      />

      {/* Smart Detection Bar */}
      <SmartDetectionBar
        detection={detection}
        hasInputText={Boolean(inputText && inputText.length > 0)}
      />

      {/* Main Cleaner Grid */}
      {/* Desktop: 2-column layout with center action, Mobile: Stacked INPUT -> KIREI IT -> OUTPUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        {/* Left: Messy Input */}
        <div className="lg:col-span-5 flex flex-col">
          <InputEditor
            value={inputText}
            onChange={setInputText}
            onPasteClipboard={handlePasteClipboard}
            onClear={() => {
              setInputText('');
              setOutputText('');
              setLastResult(null);
            }}
            stats={inputStats}
            isCodeDetected={detection.isCodeDetected}
          />
        </div>

        {/* Center: Primary Kirei It Action */}
        <div className="lg:col-span-2 flex flex-col justify-center items-center py-2 lg:py-0">
          <ActionCenter
            onClean={handleClean}
            isCleaning={isCleaning}
            disabled={!inputText || inputText.trim().length === 0}
          />
        </div>

        {/* Right: Clean Output */}
        <div className="lg:col-span-5 flex flex-col">
          <OutputEditor
            value={outputText}
            result={lastResult}
            onCopy={handleCopy}
            isCopied={isCopied}
            onDownload={handleDownload}
            originalText={inputText}
          />
        </div>
      </div>

      {/* Result Experience Summary Banner (if cleaned) */}
      {lastResult && (
        <div className="pt-2">
          <CleanSummaryBanner
            result={lastResult}
            onUndo={handleUndo}
            onCopy={handleCopy}
            isCopied={isCopied}
          />
        </div>
      )}

      {/* Rule Settings Modal */}
      <RuleSettingsModal
        isOpen={isRuleModalOpen}
        onClose={onCloseRuleModal}
        options={cleaningOptions}
        onChangeOptions={setCleaningOptions}
      />
    </div>
  );
};
