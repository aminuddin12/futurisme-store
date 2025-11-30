'use client';

import { Icon } from '@iconify/react';
import ThemeSwitcher from '@/components/Theme/ThemeSwitcher';

interface DocsNavbarProps {
  onOpenSidebar: () => void;
}

export default function DocsNavbar({ onOpenSidebar }: DocsNavbarProps) {
  return (
    <header className="sticky top-0 z-30 w-full bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
      <div className="flex h-16 items-center justify-between px-4 md:px-8">
        
        {/* Left: Mobile Menu Button & Breadcrumbs placeholder */}
        <div className="flex items-center gap-4">
          <button 
            onClick={onOpenSidebar}
            className="lg:hidden p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <Icon icon="solar:hamburger-menu-linear" className="text-2xl" />
          </button>
          
          <div className="hidden md:flex items-center text-sm text-gray-500 dark:text-gray-400">
            <span className="hover:text-primary cursor-pointer transition-colors">Docs</span>
            <Icon icon="solar:alt-arrow-right-linear" className="mx-2 text-xs" />
            <span className="font-medium text-gray-900 dark:text-white">Panduan</span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          {/* Search Box */}
          <div className="hidden md:flex items-center relative group">
            <Icon icon="solar:magnifer-linear" className="absolute left-3 text-gray-400 group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Cari dokumentasi..." 
              className="bg-gray-100 dark:bg-gray-900 border-none rounded-full py-2 pl-10 pr-4 text-sm w-64 focus:ring-2 focus:ring-primary/20 transition-all"
            />
            <div className="absolute right-3 flex gap-1">
                <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-bold text-gray-500 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-sm">Ctrl</kbd>
                <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-bold text-gray-500 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-sm">K</kbd>
            </div>
          </div>

          <div className="h-6 w-px bg-gray-200 dark:bg-gray-800 mx-1"></div>
          
          <ThemeSwitcher />
          
          <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2 text-gray-500 hover:text-black dark:hover:text-white transition-colors">
            <Icon icon="mdi:github" className="text-2xl" />
          </a>
        </div>
      </div>
    </header>
  );
}