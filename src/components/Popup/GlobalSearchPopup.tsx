'use client';

import SearchPopup from './SearchPopup';
import { useSearch } from '@/context/SearchContext';

export default function GlobalSearchPopup() {
  const { isSearchOpen, closeSearch } = useSearch();

  return (
    <SearchPopup 
      isOpen={isSearchOpen} 
      onClose={closeSearch} 
    />
  );
}