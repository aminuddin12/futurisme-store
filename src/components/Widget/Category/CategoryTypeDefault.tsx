'use client';

import { Icon } from '@iconify/react';
import Link from 'next/link';

interface CategoryItem {
  id: number;
  name: string;
  icon: string;
  href: string;
}

interface CategoryTypeDefaultProps {
  data: CategoryItem[];
}

export default function CategoryTypeDefault({ data }: CategoryTypeDefaultProps) {
  return (
    <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
      {data.map((item) => (
        <Link 
          key={item.id} 
          href={item.href}
          className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md hover:border-primary/50 transition-all group"
        >
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3 group-hover:scale-110 transition-transform">
            <Icon icon={item.icon} className="text-2xl" />
          </div>
          <span className="text-xs md:text-sm font-bold text-gray-700 dark:text-gray-300 text-center group-hover:text-primary transition-colors">
            {item.name}
          </span>
        </Link>
      ))}
    </div>
  );
}