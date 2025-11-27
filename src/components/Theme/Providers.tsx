'use client';

import { ThemeProvider } from 'next-themes';
import { SearchProvider } from '@/context/SearchContext';
import { LanguageProvider } from '@/context/LanguageContext'; // Import LanguageProvider

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    // Urutan Provider: Theme -> Language -> Search -> Lainnya
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <LanguageProvider>
        <SearchProvider>
          {children}
        </SearchProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}