/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Import JSON data statis
import idSidebar from '@/lang/id/sidebar.json';
import idLogin from '@/lang/id/login.json';
import idRegister from '@/lang/id/register.json'; // Import baru
import idNavbar from '@/lang/id/navbar.json';
import idAuth from '@/lang/id/auth.json';

import enSidebar from '@/lang/en/sidebar.json';
import enLogin from '@/lang/en/login.json';
import enRegister from '@/lang/en/register.json'; // Import baru
import enNavbar from '@/lang/en/navbar.json';
import enAuth from '@/lang/en/auth.json';

type Locale = 'id' | 'en';

const translations = {
  id: {
    sidebar: idSidebar,
    login: idLogin,
    register: idRegister, // Daftarkan
    navbar: idNavbar,
    auth: idAuth,
  },
  en: {
    sidebar: enSidebar,
    login: enLogin,
    register: enRegister, // Daftarkan
    navbar: enNavbar,
    auth: enAuth,
  },
};

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('id');

  useEffect(() => {
    const savedLocale = localStorage.getItem('app_locale') as Locale;
    if (savedLocale && (savedLocale === 'id' || savedLocale === 'en')) {
      setLocaleState(savedLocale);
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('app_locale', newLocale);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[locale];

    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        return key;
      }
    }
    return value as string;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
}