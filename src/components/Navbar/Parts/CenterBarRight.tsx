'use client';

import { Icon } from '@iconify/react';
import { useSearch } from '@/context/SearchContext';
import { useTranslation } from '@/context/LanguageContext'; // Import hook useTranslation

export default function CenterBarRight() {
  const { openSearch } = useSearch();
  const { t } = useTranslation(); // Gunakan hook

  return (
    <>
      <div className="flex items-center gap-2 md:gap-4">
        
        {/* Tombol Cari Mobile */}
        <button 
          onClick={openSearch}
          className="lg:hidden w-9 h-9 flex items-center justify-center rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <Icon icon="solar:magnifer-linear" className="text-2xl" />
        </button>

        {/* Tombol Tambahan (Tablet & Desktop) */}
        <div className="hidden md:flex items-center gap-2 border-r border-gray-200 dark:border-gray-700 pr-4 mr-2">
          
          {/* Wishlist */}
          <button className="w-10 h-10 flex items-center justify-center rounded-full text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors group relative">
            <Icon icon="solar:heart-linear" className="text-2xl group-hover:scale-110 transition-transform" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-gray-900"></span>
          </button>

          {/* Notification */}
          <button className="w-10 h-10 flex items-center justify-center rounded-full text-gray-500 hover:text-primary hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors group relative">
            <Icon icon="solar:bell-linear" className="text-2xl group-hover:rotate-12 transition-transform" />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-gray-900"></span>
          </button>

          {/* Cart */}
          <button className="w-10 h-10 flex items-center justify-center rounded-full text-gray-500 hover:text-primary hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors">
            <Icon icon="solar:cart-3-linear" className="text-2xl" />
          </button>
        </div>
        
        {/* Auth Buttons */}
        <div className="hidden md:flex gap-2 ml-1">
          <button className="px-5 py-2 rounded-lg border border-gray-200 dark:border-gray-700 font-bold text-sm text-gray-600 dark:text-gray-300 hover:border-primary dark:hover:border-primary hover:text-primary dark:hover:text-primary hover:bg-green-50 dark:hover:bg-green-900/20 transition-all">
            {t('auth.login')}
          </button>
          <button className="px-5 py-2 rounded-lg bg-primary font-bold text-sm text-white hover:bg-green-600 hover:shadow-lg hover:shadow-green-200 dark:hover:shadow-green-900/20 transition-all transform hover:-translate-y-0.5">
            {t('auth.register')}
          </button>
        </div>
      </div>
    </>
  );
}