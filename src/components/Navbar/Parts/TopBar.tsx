'use client';

import { useState, useEffect } from 'react';
import LangSwitcher from '@/lang/LangSwitcher';
import ThemeSwitcher from '../../Theme/ThemeSwitcher';
import { useTranslation } from '@/context/LanguageContext';

export default function TopBar() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 50) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    // PERBAIKAN:
    // Mengubah 'h-0' menjadi 'h-10' pada kondisi false (tidak visible).
    // Ini memastikan elemen tetap memiliki dimensi saat ditarik ke atas oleh -mt-10,
    // sehingga animasi slide-up terlihat mulus dan tidak memotong konten di bawahnya.
    <div 
      className={`bg-gray-100/50 dark:bg-gray-900 text-[11px] text-gray-500 dark:text-gray-400 hidden md:block border-b border-transparent dark:border-gray-800 transition-all duration-500 ease-in-out relative z-50 ${
        isVisible 
          ? 'h-10 mt-0 opacity-100' 
          : 'h-10 -mt-10 opacity-0 pointer-events-none'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center h-10"> {/* Set tinggi fix h-10 pada inner container */}
        <div className="flex gap-4">
          <a href="#" className="hover:text-primary transition">
            {t('navbar.download_app')}
          </a>
          <a href="#" className="hover:text-primary transition">
            {t('navbar.about_us')}
          </a>
        </div>
        
        <div className="flex items-center gap-4 relative">
            <div>
              {t('navbar.help_support')}
            </div>
            <ThemeSwitcher />
            <LangSwitcher />
        </div>
      </div>
    </div>
  );
}