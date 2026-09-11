import React, { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { CleanerContainer } from './components/cleaner/CleanerContainer';
import { FeatureModes } from './components/sections/FeatureModes';
import { RulesShowcase } from './components/sections/RulesShowcase';
import { WhyKireiPaste } from './components/sections/WhyKireiPaste';
import { HowItWorks } from './components/sections/HowItWorks';
import { KeyboardShortcuts } from './components/sections/KeyboardShortcuts';
import { PixelGridScenery } from './components/pixel/PixelGridScenery';
import { MascotState } from './components/pixel/PixelMascot';
import { SampleText } from './data/samples';
import { PresetId } from './types/rules';

export const App: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [activePreset, setActivePreset] = useState<PresetId>('all-in-one');
  const [mascotState, setMascotState] = useState<MascotState>('idle');
  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);
  const [isShortcutsModalOpen, setIsShortcutsModalOpen] = useState(false);

  const handleSelectSample = (sample: SampleText) => {
    setInputText(sample.rawText);
    setActivePreset(sample.preset as PresetId);

    // Smooth scroll to cleaner
    const cleanerElement = document.getElementById('cleaner-section');
    if (cleanerElement) {
      cleanerElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPresetFromNav = (presetId: string) => {
    setActivePreset(presetId as PresetId);
    const cleanerElement = document.getElementById('cleaner-section');
    if (cleanerElement) {
      cleanerElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col font-sans text-kirei-text-primary bg-kirei-bg selection:bg-kirei-purple selection:text-white">
      {/* Subtle pixel grid and nebula backdrop */}
      <PixelGridScenery />

      {/* Global Navbar */}
      <Navbar
        onOpenRules={() => setIsRulesModalOpen(true)}
        onOpenShortcuts={() => setIsShortcutsModalOpen(true)}
        onSelectPresetTab={handleSelectPresetFromNav}
      />

      {/* Main Content Flow */}
      <main className="flex-1 flex flex-col">
        {/* 1. Hero Section */}
        <Hero
          onSelectSample={handleSelectSample}
          mascotState={mascotState}
        />

        {/* 2. Main Cleaner Interface */}
        <CleanerContainer
          initialText={inputText}
          initialPreset={activePreset}
          onMascotStateChange={setMascotState}
          isRuleModalOpen={isRulesModalOpen}
          onCloseRuleModal={() => setIsRulesModalOpen(false)}
          onOpenRuleModal={() => setIsRulesModalOpen(true)}
        />

        {/* 3. Interactive Before/After Showcase */}
        <RulesShowcase />

        {/* 4. Feature Capabilities Grid */}
        <FeatureModes
          onSelectPreset={(p) => handleSelectPresetFromNav(p)}
        />

        {/* 5. Why KireiPaste */}
        <WhyKireiPaste />

        {/* 6. How It Works */}
        <HowItWorks />
      </main>

      {/* Global Footer */}
      <Footer
        onOpenRules={() => setIsRulesModalOpen(true)}
        onOpenShortcuts={() => setIsShortcutsModalOpen(true)}
      />

      {/* Keyboard Shortcuts Modal */}
      <KeyboardShortcuts
        isOpen={isShortcutsModalOpen}
        onClose={() => setIsShortcutsModalOpen(false)}
      />
    </div>
  );
};

export default App;
