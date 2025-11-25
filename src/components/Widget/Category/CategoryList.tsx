'use client';

import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from 'framer-motion';

interface Category {
  id: number;
  name: string;
  icon: string;
}

interface CategoryListProps {
  data: Category[];
  pageKey: number; // Key unik untuk memicu animasi saat halaman berubah
}

export default function CategoryList({ data, pageKey }: CategoryListProps) {
  return (
    <div className="relative overflow-hidden min-h-[180px]">
      <AnimatePresence mode='wait'>
        <motion.div
          key={pageKey}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-5 sm:grid-cols-8 lg:grid-cols-10 gap-y-6 gap-x-2"
        >
          {data.map((cat) => (
            <div key={cat.id} className="flex flex-col items-center gap-2 cursor-pointer group/item">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-50 dark:bg-gray-800 rounded-xl flex items-center justify-center border border-gray-100 dark:border-gray-700 group-hover/item:border-primary/30 group-hover/item:bg-green-50 dark:group-hover/item:bg-green-900/20 transition-all duration-300 shadow-sm group-hover/item:shadow-md group-hover/item:-translate-y-1">
                <Icon icon={cat.icon} className="text-2xl md:text-3xl transition-transform duration-300 group-hover/item:scale-110" />
              </div>
              <span className="text-[10px] md:text-xs font-medium text-gray-600 dark:text-gray-400 text-center leading-tight line-clamp-2 group-hover/item:text-primary transition-colors">
                {cat.name}
              </span>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}