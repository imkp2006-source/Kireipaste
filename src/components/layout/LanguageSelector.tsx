import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { SupportedLanguage } from '../../types/i18n';

export const LanguageSelector: React.FC = () => {
  const { language, setLanguage, currentLanguageInfo, languages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code: SupportedLanguage) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-kirei-borderSubtle bg-kirei-panel/80 hover:bg-kirei-card text-xs font-medium text-kirei-text-secondary hover:text-kirei-text-primary transition-all duration-150"
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <Globe className="w-3.5 h-3.5 text-kirei-purple" />
        <span>{currentLanguageInfo.flag}</span>
        <span className="hidden sm:inline">{currentLanguageInfo.name}</span>
        <ChevronDown className={`w-3 h-3 transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-44 bg-kirei-panel border border-kirei-border rounded-xl shadow-xl py-1.5 z-50 animate-scale-up">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors ${
                lang.code === language
                  ? 'bg-kirei-purple/20 text-kirei-purple-light font-semibold'
                  : 'text-kirei-text-secondary hover:text-kirei-text-primary hover:bg-kirei-card'
              }`}
            >
              <span className="flex items-center gap-2">
                <span>{lang.flag}</span>
                <span>{lang.name}</span>
              </span>
              <span className="text-[10px] text-kirei-text-muted">{lang.nativeName}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
