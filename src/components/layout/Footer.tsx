import React from 'react';
import { ShieldCheck, Terminal } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { PixelMascot } from '../pixel/PixelMascot';

interface FooterProps {
  onOpenRules: () => void;
  onOpenShortcuts: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenRules, onOpenShortcuts }) => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-kirei-borderSubtle bg-kirei-surface/70 mt-24">
      {/* Privacy Pledge Banner */}
      <div className="border-b border-kirei-borderSubtle/60 bg-kirei-panel/40 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-kirei-green/10 border border-kirei-green/30 text-kirei-green shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <p className="text-xs sm:text-sm text-kirei-text-secondary leading-relaxed">
              <strong className="text-kirei-text-primary font-semibold">Privacy Pledge:</strong>{' '}
              {t('footer.privacyPledge')}
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-kirei-text-muted shrink-0">
            <Terminal className="w-3.5 h-3.5 text-kirei-yellow" />
            <span>Zero Server Latency · 100% In-Memory</span>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Brand */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <PixelMascot size="sm" state="clean" />
              <span className="text-lg font-bold text-kirei-text-primary">KireiPaste</span>
            </div>
            <p className="text-sm text-kirei-text-secondary max-w-md leading-relaxed">
              {t('brand.description')}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={onOpenShortcuts}
                className="text-xs text-kirei-purple-light hover:text-white bg-kirei-purple/10 border border-kirei-purple/30 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <span>⌨️ {t('footer.shortcutsHint')}</span>
              </button>
            </div>
          </div>

          {/* Col 2: Capabilities */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-kirei-text-muted mb-4">
              Capabilities
            </h4>
            <ul className="space-y-2.5 text-sm text-kirei-text-secondary">
              <li>
                <a href="#cleaner-section" className="hover:text-kirei-purple-light transition-colors">
                  PDF Line Wrap Repair
                </a>
              </li>
              <li>
                <a href="#cleaner-section" className="hover:text-kirei-purple-light transition-colors">
                  AI Output Sanitizer
                </a>
              </li>
              <li>
                <a href="#cleaner-section" className="hover:text-kirei-purple-light transition-colors">
                  Zero-Width Space Killer
                </a>
              </li>
              <li>
                <a href="#cleaner-section" className="hover:text-kirei-purple-light transition-colors">
                  Full-Width ASCII Normalizer
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Configuration */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-kirei-text-muted mb-4">
              Utility & Engine
            </h4>
            <ul className="space-y-2.5 text-sm text-kirei-text-secondary">
              <li>
                <button
                  onClick={onOpenRules}
                  className="hover:text-kirei-purple-light transition-colors text-left"
                >
                  Custom Rule Engine
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenShortcuts}
                  className="hover:text-kirei-purple-light transition-colors text-left"
                >
                  Keyboard Shortcuts
                </button>
              </li>
              <li>
                <a href="#why-section" className="hover:text-kirei-purple-light transition-colors">
                  Deterministic vs AI Comparison
                </a>
              </li>
              <li>
                <a href="#how-it-works-section" className="hover:text-kirei-purple-light transition-colors">
                  How It Works
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-kirei-borderSubtle flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-kirei-text-muted">
          <div className="flex items-center gap-1.5">
            <span>© {new Date().getFullYear()} KireiPaste. {t('footer.rights')}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono text-kirei-purple-light">COPY MESSY. PASTE CLEAN.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
