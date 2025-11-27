'use client';

import { motion } from 'framer-motion';
import BoxHeader from './Box-item/BoxHeader';
import BoxList from './Box-item/BoxList';

interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string;
  subCategories: string[];
}

interface BoxCategoryProps {
  data: Category[];
}

export default function BoxCategory({ data }: BoxCategoryProps) {
  // Variasi animasi
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      // UPDATE: Menggunakan flex-col untuk menumpuk kategori per baris (row)
      className="flex flex-col gap-6"
    >
      {data.map((category) => (
        <motion.div
          key={category.id}
          variants={itemVariants}
          className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow w-full"
        >
          {/* Header Kategori */}
          <BoxHeader 
            icon={category.icon || 'solar:box-bold-duotone'} 
            name={category.name} 
          />
          
          {/* List Sub-kategori (Grid Layout diatur di dalam komponen BoxList) */}
          <BoxList 
            items={category.subCategories || []} 
            categorySlug={category.slug}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}