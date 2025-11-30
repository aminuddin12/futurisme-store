'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Icon } from '@iconify/react';

interface GroupItem {
  name: string;
  items: string[];
}

interface CategoryFilterGroupProps {
  data: GroupItem[];
}

export default function CategoryFilterGroup({ data }: CategoryFilterGroupProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((group, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: idx * 0.1 }}
          className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all"
        >
          {/* Header Group */}
          <div className="bg-gray-50 dark:bg-gray-800/50 p-4 border-b border-gray-100 dark:border-gray-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Icon icon="solar:folder-with-files-bold-duotone" className="text-xl" />
            </div>
            <h3 className="font-bold text-gray-800 dark:text-white text-lg">
              {group.name}
            </h3>
          </div>

          {/* List Items */}
          <div className="p-4">
            <div className="flex flex-wrap gap-2">
              {group.items.map((item, i) => (
                <Link 
                  key={i}
                  href={`/category/${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className="px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-gray-800 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-primary hover:text-white transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}