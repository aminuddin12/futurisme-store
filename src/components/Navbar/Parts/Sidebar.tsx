/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@iconify/react';
import { motion, AnimatePresence, Variants } from 'framer-motion'; // Import Variants type
import { useTranslation } from '@/context/LanguageContext';
import sidebarData from '@/data/sidebarMenu.json';
import { useTheme } from 'next-themes';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { t, locale, setLocale } = useTranslation();
  const { theme, setTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  
  // State untuk dropdown di footer sidebar
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  
  // Refs untuk klik luar
  const langRef = useRef<HTMLDivElement>(null);
  const themeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
      if (themeRef.current && !themeRef.current.contains(event.target as Node)) {
        setIsThemeOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Definisi Variants dengan tipe eksplisit untuk menghindari error TypeScript
  const sidebarVariants: Variants = {
    closed: { 
      x: "-100%", 
      opacity: 0, 
      transition: { type: "spring", stiffness: 300, damping: 30 } 
    },
    open: { 
      x: "0%", 
      opacity: 1, 
      transition: { type: "spring", stiffness: 300, damping: 30 } 
    }
  };

  const containerVariants: Variants = {
    open: { 
      transition: { staggerChildren: 0.05, delayChildren: 0.1 } 
    },
    closed: { 
      transition: { staggerChildren: 0.05, staggerDirection: -1 } 
    }
  };

  const itemVariants: Variants = {
    closed: { x: -20, opacity: 0 },
    open: { x: 0, opacity: 1 }
  };

  const SkeletonItem = () => (
    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 animate-pulse">
      <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
    </div>
  );

  // Helper Labels
  const langLabels = { id: 'Bahasa Indonesia', en: 'English' };
  const themeLabels = {
    light: { id: 'Terang', en: 'Light' },
    dark: { id: 'Gelap', en: 'Dark' },
    system: { id: 'Sistem', en: 'System' },
  };

  const currentThemeLabel = themeLabels[theme as keyof typeof themeLabels]?.[locale] || themeLabels['system'][locale];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          <motion.aside
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            className="fixed top-0 left-0 h-full w-[280px] bg-white dark:bg-gray-900 shadow-2xl z-[70] flex flex-col rounded-r-2xl border-r border-gray-100 dark:border-gray-800"
          >
            
            {/* Header */}
            <div className="p-6 flex items-center justify-between border-b border-gray-100 dark:border-gray-800 shrink-0">
              <div className="flex items-center gap-2 text-primary">
                <Icon icon="solar:shop-2-bold-duotone" className="text-2xl" />
                <span className="font-extrabold text-xl tracking-tight">{t('sidebar.menu')}</span>
              </div>
              <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 dark:bg-gray-800 text-gray-500 hover:text-red-500 hover:bg-red-50 transition-colors">
                <Icon icon="solar:close-circle-bold-duotone" className="text-xl" />
              </button>
            </div>

            {/* Menu List */}
            <div className="flex-1 overflow-y-auto py-6 px-4 space-y-6">
              {isLoading ? (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="px-4 h-3 w-16 bg-gray-200 dark:bg-gray-800 rounded mb-3 animate-pulse"></div>
                    {[1, 2, 3, 4, 5].map((i) => <SkeletonItem key={i} />)}
                  </div>
                  <div className="h-px bg-gray-100 dark:bg-gray-800 mx-2" />
                  <div className="space-y-2">
                    <div className="px-4 h-3 w-16 bg-gray-200 dark:bg-gray-800 rounded mb-3 animate-pulse"></div>
                    {[1, 2].map((i) => <SkeletonItem key={`sec-${i}`} />)}
                  </div>
                </div>
              ) : (
                <motion.div variants={containerVariants} initial="closed" animate="open">
                  <div className="space-y-1">
                    <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t('sidebar.nav_title')}</p>
                    {sidebarData.main.map((menu) => {
                      const isActive = pathname === menu.href;
                      return (
                        <motion.div key={menu.translationKey} variants={itemVariants}>
                          <Link href={menu.href} onClick={onClose} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive ? 'bg-primary/10 text-primary font-bold' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'}`}>
                            <Icon icon={menu.icon} className={`text-xl transition-transform group-hover:scale-110 ${isActive ? 'text-primary' : 'text-gray-400 dark:text-gray-500 group-hover:text-primary'}`} />
                            <span>{t(`sidebar.${menu.translationKey}`)}</span>
                            {isActive && <motion.div layoutId="sidebar-active" className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />}
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                  <div className="h-px bg-gray-100 dark:bg-gray-800 mx-2 my-6" />
                  <div className="space-y-1">
                    <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t('sidebar.others_title')}</p>
                    {sidebarData.secondary.map((menu) => (
                      <motion.div key={menu.translationKey} variants={itemVariants}>
                        <Link href={menu.href} onClick={onClose} className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-all duration-200 group">
                          <Icon icon={menu.icon} className="text-xl text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-transform group-hover:rotate-12" />
                          <span className="font-medium">{t(`sidebar.${menu.translationKey}`)}</span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Footer Sidebar */}
            <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 rounded-br-2xl shrink-0">
              
              {/* --- SWITCHER SECTION --- */}
              <div className="grid grid-cols-2 gap-2 mb-4 items-center"> 
                {/* Added items-center to ensure vertical alignment */}
                
                {/* Language Switcher Dropup */}
                <div className="relative h-full" ref={langRef}>
                    <button 
                        onClick={() => { setIsLangOpen(!isLangOpen); setIsThemeOpen(false); }}
                        className="w-full h-full flex items-center justify-between px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-xs font-bold text-gray-700 dark:text-gray-300 hover:border-primary transition-colors"
                    >
                        <div className="flex items-center gap-2">
                            <span className="text-base">{locale === 'id' ? '🇮🇩' : '🇺🇸'}</span>
                            <span>{locale.toUpperCase()}</span>
                        </div>
                        <Icon icon="solar:alt-arrow-up-linear" className={`transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                        {isLangOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className="absolute bottom-full left-0 w-full mb-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 py-1 z-50 overflow-hidden"
                            >
                                {['id', 'en'].map((l) => (
                                    <button
                                        key={l}
                                        onClick={() => { setLocale(l as 'id'|'en'); setIsLangOpen(false); }}
                                        className={`w-full text-left px-3 py-2 text-xs flex items-center gap-2 transition-colors ${locale === l ? 'bg-primary/5 text-primary font-bold' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                                    >
                                        <span className="text-base">{l === 'id' ? '🇮🇩' : '🇺🇸'}</span>
                                        <span>{langLabels[l as keyof typeof langLabels]}</span>
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Theme Switcher Dropup */}
                <div className="relative h-full" ref={themeRef}>
                    <button 
                        onClick={() => { setIsThemeOpen(!isThemeOpen); setIsLangOpen(false); }}
                        className="w-full h-full flex items-center justify-between px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-xs font-bold text-gray-700 dark:text-gray-300 hover:border-primary transition-colors"
                    >
                        <div className="flex items-center gap-2 overflow-hidden">
                            <Icon icon={theme === 'dark' ? 'solar:moon-bold-duotone' : theme === 'light' ? 'solar:sun-bold-duotone' : 'solar:monitor-smartphone-bold-duotone'} className="text-base shrink-0" />
                            <span className="truncate">{currentThemeLabel}</span>
                        </div>
                        <Icon icon="solar:alt-arrow-up-linear" className={`transition-transform shrink-0 ${isThemeOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                        {isThemeOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className="absolute bottom-full right-0 w-full mb-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 py-1 z-50 overflow-hidden"
                            >
                                {['light', 'dark', 'system'].map((tMode) => (
                                    <button
                                        key={tMode}
                                        onClick={() => { setTheme(tMode); setIsThemeOpen(false); }}
                                        className={`w-full text-left px-3 py-2 text-xs flex items-center gap-2 transition-colors ${theme === tMode ? 'bg-primary/5 text-primary font-bold' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                                    >
                                        <Icon icon={tMode === 'dark' ? 'solar:moon-bold-duotone' : tMode === 'light' ? 'solar:sun-bold-duotone' : 'solar:monitor-smartphone-bold-duotone'} className="text-base" />
                                        <span>{themeLabels[tMode as keyof typeof themeLabels][locale]}</span>
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

              </div>

              {/* User Info */}
              <div className="flex items-center gap-3 px-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-green-400 flex items-center justify-center text-white shadow-lg shadow-primary/30">
                  <Icon icon="solar:user-bold" className="text-xl" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-800 dark:text-white truncate">{t('sidebar.guest')}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{t('sidebar.welcome')}</p>
                </div>
                <Link href="/login" onClick={onClose} className="p-2 text-gray-400 hover:text-primary transition-colors" title={t('sidebar.login')}>
                  <Icon icon="solar:login-3-bold-duotone" className="text-xl" />
                </Link>
              </div>
            </div>

          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}