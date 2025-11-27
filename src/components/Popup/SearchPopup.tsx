'use client';

import { useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchPopup({ isOpen, onClose }: SearchPopupProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');

  // Auto-focus input saat popup terbuka
  useEffect(() => {
    if (isOpen) {
      // Sedikit delay agar animasi selesai sebelum focus
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleClearOrClose = () => {
    if (query) {
      setQuery('');
      inputRef.current?.focus();
    } else {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center px-4">
          
          {/* Backdrop Blur - Klik luar untuk menutup */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Popup Container - Diberi margin top agar tidak mepet */}
          <motion.div
            initial={{ y: -20, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -20, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden mt-20 md:mt-24"
          >
            {/* Search Header */}
            <div className="flex items-center gap-3 p-4 border-b border-gray-100 dark:border-gray-800">
              <Icon icon="solar:magnifer-linear" className="text-2xl text-primary" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari produk, kategori, atau brand..."
                className="flex-1 bg-transparent border-none outline-none text-gray-800 dark:text-gray-100 placeholder-gray-400 text-base"
              />
              
              {/* Tombol Silang (Clear/Close) */}
              <button 
                onClick={handleClearOrClose}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors p-1"
              >
                <Icon icon="solar:close-circle-bold" className="text-xl" />
              </button>
            </div>

            {/* Recent / Popular Searches (Dummy) */}
            <div className="p-4 bg-gray-50 dark:bg-gray-950/50 min-h-[200px]">
              <div className="mb-4">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Pencarian Populer</h4>
                <div className="flex flex-wrap gap-2">
                  {['Iphone 15 Pro', 'Sepatu Running', 'Kemeja Flanel', 'Smartwatch', 'Tas Wanita'].map((item) => (
                    <button 
                      key={item}
                      className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-full text-xs text-gray-600 dark:text-gray-300 hover:border-primary hover:text-primary transition-colors"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}