'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface CategoryItem {
  id: number;
  name: string;
  slug: string;
  image: string;
}

interface CategoryFilterAllProps {
  data: CategoryItem[];
}

export default function CategoryFilterAll({ data }: CategoryFilterAllProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
    >
      {data.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <Link 
            href={`/category/${item.slug}`}
            className="group block relative aspect-square rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800"
          >
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-4">
              <span className="text-white font-bold text-sm group-hover:text-primary transition-colors">
                {item.name}
              </span>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}