'use client';

import { ThemeProvider } from 'next-themes';
import { SearchProvider } from '@/context/SearchContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { AuthModalProvider } from '@/context/AuthModalContext'; // Import Provider

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <LanguageProvider>
        <SearchProvider>
          <AuthModalProvider> {/* Wrap di sini */}
            {children}
          </AuthModalProvider>
        </SearchProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}