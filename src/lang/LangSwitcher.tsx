'use client';

import { useTranslation } from '@/context/LanguageContext';
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

export default function LangSwitcher() {
  const { locale, setLocale } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Tutup dropdown saat klik luar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const languages = [
    { code: 'id', label: 'ID', flag: '🇮🇩', fullName: 'Bahasa Indonesia' },
    { code: 'en', label: 'EN', flag: '🇺🇸', fullName: 'English' },
  ];

  const currentLang = languages.find(l => l.code === locale) || languages[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
      >
        <span className="text-lg">{currentLang.flag}</span>
        <span className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase">{currentLang.code}</span>
        <Icon 
          icon="solar:alt-arrow-down-linear" 
          className={`text-gray-400 text-xs transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-40 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden z-50 py-1"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLocale(lang.code as 'id' | 'en');
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors
                  ${locale === lang.code 
                    ? 'bg-primary/5 text-primary font-bold' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }
                `}
              >
                <span className="text-lg">{lang.flag}</span>
                <span>{lang.fullName}</span>
                {locale === lang.code && (
                  <Icon icon="solar:check-circle-bold" className="ml-auto text-primary" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}