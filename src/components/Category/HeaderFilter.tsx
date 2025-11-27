'use client';

import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';

const filterOptions = [
  { id: 'all', label: 'Semua Kategori', icon: 'solar:layers-minimalistic-bold-duotone' },
  { id: 'popular', label: 'Kategori Terpopuler', icon: 'solar:fire-bold-duotone' },
  { id: 'alphabet', label: 'Berdasarkan Alfabet', icon: 'solar:sort-from-top-to-bottom-bold-duotone' },
  { id: 'group', label: 'Berdasarkan Kelompok', icon: 'solar:users-group-two-rounded-bold-duotone' },
];

export default function HeaderFilter() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [isScrolled, setIsScrolled] = useState(false);

  // Efek Scroll untuk mengubah ukuran
  useEffect(() => {
    const handleScroll = () => {
      // Ambang batas yang sama dengan Header.tsx agar sinkron
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`flex items-center gap-2 md:gap-3 overflow-x-auto scrollbar-hide transition-all duration-300 ${isScrolled ? 'pt-1 pb-1 mt-0' : 'pt-4 pb-1 mt-2'}`}>
      {filterOptions.map((option) => {
        const isActive = activeFilter === option.id;
        return (
          <button
            key={option.id}
            onClick={() => setActiveFilter(option.id)}
            className={`
              group flex items-center gap-1.5 md:gap-2 rounded-full font-medium transition-all duration-300 whitespace-nowrap border
              ${isActive 
                ? 'bg-primary text-white border-primary shadow-sm shadow-green-100 dark:shadow-none' 
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }
              /* DINAMIS SIZE BERDASARKAN SCROLL */
              ${isScrolled 
                ? 'px-3 py-1 text-xs' // Ukuran Kecil saat Scroll
                : 'px-4 py-2 text-sm' // Ukuran Normal
              }
            `}
          >
            <Icon 
              icon={option.icon} 
              className={`transition-all duration-300 ${
                isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-600 dark:text-gray-500 dark:group-hover:text-gray-300'
              } 
              ${isScrolled ? 'text-base' : 'text-lg'} 
              `} 
            />
            <span>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}