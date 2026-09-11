import React from 'react';
import { Modal } from '../ui/Modal';
import { Sparkles, Copy, Settings2, X } from 'lucide-react';

interface KeyboardShortcutsProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyboardShortcuts: React.FC<KeyboardShortcutsProps> = ({
  isOpen,
  onClose,
}) => {
  const shortcuts = [
    {
      action: 'Clean messy text (Kirei It)',
      keys: ['Ctrl / ⌘', 'Enter'],
      icon: Sparkles,
      color: 'text-kirei-yellow',
    },
    {
      action: 'Copy cleaned text to clipboard',
      keys: ['Ctrl / ⌘', 'Shift', 'C'],
      icon: Copy,
      color: 'text-kirei-purple-light',
    },
    {
      action: 'Open custom rule engine',
      keys: ['Ctrl / ⌘', ','],
      icon: Settings2,
      color: 'text-kirei-pink-light',
    },
    {
      action: 'Dismiss active dialog or drawer',
      keys: ['Esc'],
      icon: X,
      color: 'text-kirei-text-muted',
    },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Keyboard Shortcuts"
      subtitle="Speed up your text cleaning workflow with power hotkeys."
      maxWidth="max-w-md"
    >
      <div className="space-y-3">
        {shortcuts.map((sc, i) => {
          const Icon = sc.icon;
          return (
            <div
              key={i}
              className="flex items-center justify-between p-3 rounded-lg bg-kirei-surface border border-kirei-borderSubtle"
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 ${sc.color}`} />
                <span className="text-xs font-medium text-kirei-text-primary">
                  {sc.action}
                </span>
              </div>
              <div className="flex items-center gap-1">
                {sc.keys.map((k, ki) => (
                  <kbd
                    key={ki}
                    className="px-2 py-1 rounded bg-kirei-panel border border-kirei-border text-[11px] font-mono text-kirei-yellow"
                  >
                    {k}
                  </kbd>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Modal>
  );
};
