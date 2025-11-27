'use client';

import LangSwitcher from '@/lang/LangSwitcher';
import ThemeSwitcher from '../../Theme/ThemeSwitcher';
import { useTranslation } from '@/context/LanguageContext'; // Import hook

export default function TopBar() {
  const { t } = useTranslation(); // Gunakan hook

  return (
    <div className="bg-gray-100/50 dark:bg-gray-900 text-[11px] text-gray-500 dark:text-gray-400 py-1 hidden md:block border-b border-transparent dark:border-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex gap-4">
          <a href="#" className="hover:text-primary transition">
            {t('navbar.download_app')}
          </a>
          <a href="#" className="hover:text-primary transition">
            {t('navbar.about_us')}
          </a>
        </div>
        
        <div className="flex items-center gap-4">
            <div>
              {t('navbar.help_support')}
            </div>
            {/* ThemeSwitcher ditambahkan di sini */}
            <ThemeSwitcher />
            {/* LangSwitcher sudah ada dan berfungsi */}
            <LangSwitcher />
        </div>
      </div>
    </div>
  );
}