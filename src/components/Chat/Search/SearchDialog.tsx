'use client';

import { useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

interface SearchDialogProps {
  onClose: () => void;
  onSearch: (query: string) => void;
}

export default function SearchDialog({ onClose, onSearch }: SearchDialogProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus saat dialog terbuka
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    onSearch(val);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute top-[60px] left-0 w-full z-20 px-4 py-2 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 shadow-sm"
    >
      <div className="relative flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1.5 border border-gray-200 dark:border-gray-700 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
        <Icon icon="fluent:search-24-regular" className="text-gray-400 text-lg mr-2" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleSearchChange}
          placeholder="Cari pesan..."
          className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 outline-none"
        />
        {query && (
          <button 
            onClick={() => { setQuery(''); onSearch(''); }} 
            className="mr-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
             <Icon icon="fluent:dismiss-16-filled" />
          </button>
        )}
        <button 
            onClick={onClose} 
            className="text-xs font-semibold text-primary hover:text-primary/80 ml-3 px-2 py-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          Batal
        </button>
      </div>
    </motion.div>
  );
}