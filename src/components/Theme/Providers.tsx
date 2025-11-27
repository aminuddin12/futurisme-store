'use client';

import { ThemeProvider } from 'next-themes';
import { SearchProvider } from '@/context/SearchContext'; // Import SearchProvider

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SearchProvider>
        {children}
      </SearchProvider>
    </ThemeProvider>
  );
}