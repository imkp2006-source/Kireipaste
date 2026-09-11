import React, { useState } from 'react';
import { Menu, X, Shield, Keyboard, Settings2 } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { LanguageSelector } from './LanguageSelector';
import { PixelMascot } from '../pixel/PixelMascot';

interface NavbarProps {
  onOpenRules: () => void;
  onOpenShortcuts: () => void;
  onSelectPresetTab?: (presetId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenRules,
  onOpenShortcuts,
  onSelectPresetTab,
}) => {
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string, presetId?: string) => {
    setMobileMenuOpen(false);
    if (presetId && onSelectPresetTab) {
      onSelectPresetTab(presetId);
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-kirei-borderSubtle bg-kirei-bg/85 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-kirei-purple rounded-lg p-1"
          >
            <PixelMascot size="sm" state="idle" />
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-kirei-purple-light group-hover:to-kirei-pink-light transition-all">
                  KireiPaste
                </span>
                <span className="text-[10px] font-pixel text-kirei-yellow bg-kirei-yellow/10 border border-kirei-yellow/30 px-1.5 py-0.2 rounded">
                  v0.1
                </span>
              </div>
            </div>
          </a>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-kirei-text-secondary">
          <button
            onClick={() => handleNavClick('cleaner-section', 'all-in-one')}
            className="hover:text-kirei-text-primary transition-colors cursor-pointer py-1"
          >
            {t('nav.clean')}
          </button>
          <button
            onClick={() => handleNavClick('cleaner-section', 'pdf')}
            className="hover:text-kirei-text-primary transition-colors cursor-pointer py-1"
          >
            {t('nav.pdf')}
          </button>
          <button
            onClick={() => handleNavClick('cleaner-section', 'ai-chat')}
            className="hover:text-kirei-text-primary transition-colors cursor-pointer py-1"
          >
            {t('nav.ai')}
          </button>
          <button
            onClick={() => handleNavClick('features-section')}
            className="hover:text-kirei-text-primary transition-colors cursor-pointer py-1"
          >
            {t('nav.features')}
          </button>
          <button
            onClick={() => handleNavClick('how-it-works-section')}
            className="hover:text-kirei-text-primary transition-colors cursor-pointer py-1"
          >
            {t('nav.howItWorks')}
          </button>
          <button
            onClick={() => handleNavClick('why-section')}
            className="hover:text-kirei-text-primary transition-colors cursor-pointer py-1"
          >
            {t('nav.privacy')}
          </button>
        </nav>

        {/* Right side controls (Privacy pill, Rules button, Shortcuts, Language) */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Privacy badge */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-kirei-panel border border-kirei-borderSubtle text-[11px] font-mono text-kirei-green-light">
            <Shield className="w-3 h-3 text-kirei-green" />
            <span>100% Client-Side</span>
          </div>

          {/* Quick Rules Modal Button */}
          <button
            onClick={onOpenRules}
            title={t('cleaner.customizeRules')}
            className="p-1.5 text-kirei-text-secondary hover:text-kirei-text-primary hover:bg-kirei-panel rounded-lg border border-transparent hover:border-kirei-border transition-colors"
            aria-label="Cleaning rules settings"
          >
            <Settings2 className="w-4 h-4" />
          </button>

          {/* Keyboard Shortcuts Helper */}
          <button
            onClick={onOpenShortcuts}
            title="Keyboard Shortcuts"
            className="hidden sm:flex p-1.5 text-kirei-text-secondary hover:text-kirei-text-primary hover:bg-kirei-panel rounded-lg border border-transparent hover:border-kirei-border transition-colors"
            aria-label="Keyboard shortcuts"
          >
            <Keyboard className="w-4 h-4" />
          </button>

          {/* Language Selector */}
          <LanguageSelector />

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-kirei-text-secondary hover:text-kirei-text-primary hover:bg-kirei-panel rounded-lg border border-kirei-borderSubtle"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-kirei-text-primary" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-kirei-border bg-kirei-panel/95 backdrop-blur-xl px-4 pt-3 pb-5 space-y-3 animate-slide-down">
          <div className="grid grid-cols-2 gap-2 text-sm font-medium">
            <button
              onClick={() => handleNavClick('cleaner-section', 'all-in-one')}
              className="text-left px-3 py-2 rounded-lg bg-kirei-card hover:bg-kirei-cardHover text-kirei-text-primary"
            >
              {t('nav.clean')}
            </button>
            <button
              onClick={() => handleNavClick('cleaner-section', 'pdf')}
              className="text-left px-3 py-2 rounded-lg bg-kirei-card hover:bg-kirei-cardHover text-kirei-text-primary"
            >
              {t('nav.pdf')}
            </button>
            <button
              onClick={() => handleNavClick('cleaner-section', 'ai-chat')}
              className="text-left px-3 py-2 rounded-lg bg-kirei-card hover:bg-kirei-cardHover text-kirei-text-primary"
            >
              {t('nav.ai')}
            </button>
            <button
              onClick={() => handleNavClick('features-section')}
              className="text-left px-3 py-2 rounded-lg bg-kirei-card hover:bg-kirei-cardHover text-kirei-text-primary"
            >
              {t('nav.features')}
            </button>
            <button
              onClick={() => handleNavClick('how-it-works-section')}
              className="text-left px-3 py-2 rounded-lg bg-kirei-card hover:bg-kirei-cardHover text-kirei-text-primary"
            >
              {t('nav.howItWorks')}
            </button>
            <button
              onClick={() => handleNavClick('why-section')}
              className="text-left px-3 py-2 rounded-lg bg-kirei-card hover:bg-kirei-cardHover text-kirei-text-primary"
            >
              {t('nav.privacy')}
            </button>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-kirei-borderSubtle text-xs text-kirei-text-secondary">
            <div className="flex items-center gap-1 text-kirei-green-light">
              <Shield className="w-3.5 h-3.5 text-kirei-green" />
              <span>100% Client-Side Privacy</span>
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRules();
              }}
              className="flex items-center gap-1 text-kirei-purple-light"
            >
              <Settings2 className="w-3.5 h-3.5" />
              <span>{t('cleaner.settings')}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
