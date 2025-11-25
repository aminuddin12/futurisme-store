'use client';

import { useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9 bg-gray-200 rounded-full animate-pulse"></div>;
  }

  const icons = {
    light: 'fa-sun',
    dark: 'fa-moon',
    system: 'fa-desktop'
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-all border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300"
        aria-label="Ubah Tema"
      >
        <i className={`fas ${theme === 'dark' ? 'fa-moon' : theme === 'light' ? 'fa-sun' : 'fa-desktop'}`}></i>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 py-1 z-50">
          {(['light', 'dark', 'system'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => {
                setTheme(mode);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors
                ${theme === mode ? 'text-primary font-bold bg-green-50 dark:bg-green-900/20' : 'text-gray-600 dark:text-gray-300'}
              `}
            >
              <i className={`fas ${icons[mode]} w-4 text-center`}></i>
              <span className="capitalize">{mode}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}