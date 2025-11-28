'use client';

import { Icon } from '@iconify/react';
import { useSearch } from '@/context/SearchContext';
import { useTranslation } from '@/context/LanguageContext';
import { useAuthModal } from '@/context/AuthModalContext';
import { useWebConfig } from '@/context/WebConfigContext';
import Link from 'next/link';

export default function CenterBarRight() {
  const { openSearch } = useSearch();
  const { t } = useTranslation();
  const { openLogin, openRegister } = useAuthModal();
  const { getFeature } = useWebConfig();

  // Pastikan nilai boolean, default ke false jika undefined
  const isLoginPopupEnabled = getFeature('enableLoginPopup') === true;
  const isRegisterPopupEnabled = getFeature('enableRegisterPopup') === true;

  // Helper Auth Button
  const AuthButton = ({ type, label, href }: { type: 'login' | 'register', label: string, href: string }) => {
    const baseClass = "px-5 py-2 rounded-lg font-bold text-sm transition-all transform hover:-translate-y-0.5";
    const loginClass = "border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-primary dark:hover:border-primary hover:text-primary dark:hover:text-primary hover:bg-green-50 dark:hover:bg-green-900/20";
    const registerClass = "bg-primary text-white hover:bg-green-600 hover:shadow-lg hover:shadow-green-200 dark:hover:shadow-green-900/20";

    const className = `${baseClass} ${type === 'login' ? loginClass : registerClass}`;

    // Logika Register
    if (type === 'register') {
       if (isRegisterPopupEnabled) {
         return (
           <button onClick={openRegister} className={className}>
             {label}
           </button>
         );
       }
       return (
         <Link href={href} className={className}>
           {label}
         </Link>
       );
    }

    // Logika Login
    if (type === 'login') {
        if (isLoginPopupEnabled) {
          return (
            <button onClick={openLogin} className={className}>
              {label}
            </button>
          );
        }
        return (
          <Link href={href} className={className}>
            {label}
          </Link>
        );
    }

    return null;
  };

  return (
    <>
      <div className="flex items-center gap-2 md:gap-4">
        
        <button 
          onClick={openSearch}
          className="lg:hidden w-9 h-9 flex items-center justify-center rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <Icon icon="solar:magnifer-linear" className="text-2xl" />
        </button>

        <div className="hidden md:flex items-center gap-2 border-r border-gray-200 dark:border-gray-700 pr-4 mr-2">
          <button className="w-10 h-10 flex items-center justify-center rounded-full text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors group relative">
            <Icon icon="solar:heart-linear" className="text-2xl group-hover:scale-110 transition-transform" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-gray-900"></span>
          </button>

          <button className="w-10 h-10 flex items-center justify-center rounded-full text-gray-500 hover:text-primary hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors group relative">
            <Icon icon="solar:bell-linear" className="text-2xl group-hover:rotate-12 transition-transform" />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-gray-900"></span>
          </button>

          <button className="w-10 h-10 flex items-center justify-center rounded-full text-gray-500 hover:text-primary hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors">
            <Icon icon="solar:cart-3-linear" className="text-2xl" />
          </button>
        </div>
        
        <div className="hidden md:flex gap-2 ml-1">
          <AuthButton 
            type="login" 
            label={t('auth.login')} 
            href="/login" 
          />
          <AuthButton 
            type="register" 
            label={t('auth.register')} 
            href="/register" 
          />
        </div>
      </div>
    </>
  );
}