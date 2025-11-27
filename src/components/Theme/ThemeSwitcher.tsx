/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useTranslation } from '@/context/LanguageContext'; // Import useTranslation

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { locale } = useTranslation(); // Ambil locale aktif

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!mounted) {
    return <div className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse"></div>;
  }

  // Helper untuk label bahasa
  const getLabel = (key: string) => {
    const labels: Record<string, { id: string; en: string }> = {
      light: { id: 'Terang', en: 'Light' },
      dark: { id: 'Gelap', en: 'Dark' },
      system: { id: 'Sistem', en: 'System' },
    };
    return labels[key][locale] || labels[key]['id'];
  };

  const themes = [
    { id: 'light', icon: 'solar:sun-bold-duotone', label: getLabel('light') },
    { id: 'dark', icon: 'solar:moon-bold-duotone', label: getLabel('dark') },
    { id: 'system', icon: 'solar:monitor-smartphone-bold-duotone', label: getLabel('system') }
  ];

  const activeTheme = themes.find(t => t.id === theme) || themes[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.95 }}
        className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg transition-all border border-transparent
          ${isOpen 
            ? 'bg-gray-100 dark:bg-gray-800 text-primary' 
            : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
          }
        `}
        aria-label="Ubah Tema"
      >
        {/* Animasi rotasi ikon */}
        <AnimatePresence mode='wait' initial={false}>
            <motion.div
                key={theme}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.15 }}
            >
                <Icon icon={activeTheme.icon} className="text-lg" />
            </motion.div>
        </AnimatePresence>
        
        {/* Label Teks Kecil (Localized) */}
        <span className="text-xs font-medium hidden sm:block">{activeTheme.label}</span>
        
        <Icon 
          icon="solar:alt-arrow-down-linear" 
          className={`text-xs transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
            <motion.div
                initial={{ opacity: 0, y: 5, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 5, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 py-1 z-50 overflow-hidden"
            >
            {themes.map((item) => {
                const isActive = theme === item.id;
                return (
                    <button
                    key={item.id}
                    onClick={() => {
                        setTheme(item.id);
                        setIsOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center gap-2.5 transition-colors relative
                        ${isActive 
                        ? 'text-primary font-bold bg-primary/5' 
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                        }
                    `}
                    >
                    <Icon 
                        icon={item.icon} 
                        className={`text-base ${isActive ? 'text-primary' : 'text-gray-400 dark:text-gray-500'}`} 
                    />
                    <span>{item.label}</span>
                    
                    {isActive && (
                        <motion.div 
                            layoutId="activeTheme"
                            className="absolute left-0 w-0.5 h-4 bg-primary rounded-r-full"
                        />
                    )}
                    </button>
                );
            })}
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}