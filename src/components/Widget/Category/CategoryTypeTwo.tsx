/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Link from 'next/link';
import ServiceTabs from './ServiceTabs';

interface CategoryTypeTwoProps {
  data: any; // Menggunakan any sementara untuk fleksibilitas JSON, bisa diperketat nanti
}

export default function CategoryTypeTwo({ data }: CategoryTypeTwoProps) {
  const { leftContent, rightContent } = data;

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full">
      {/* Kolom Kiri (65%) - Grid Minicard */}
      <div className="w-full lg:w-[65%]">
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm h-full">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-primary rounded-full"></span>
            {leftContent.title}
          </h3>
          
          <div className="grid grid-cols-4 gap-3">
            {leftContent.items.map((item: any) => (
              <Link 
                key={item.id} 
                href={item.href}
                className="group flex flex-col items-center gap-2"
              >
                <div className="w-full aspect-square rounded-xl overflow-hidden relative bg-gray-100 dark:bg-gray-800">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <span className="text-[10px] md:text-xs font-medium text-center text-gray-600 dark:text-gray-300 line-clamp-2 group-hover:text-primary">
                    {item.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Kolom Kanan (35%) - Service Tabs */}
      <div className="w-full lg:w-[35%]">
        <ServiceTabs tabs={rightContent.tabs} data={rightContent.data} />
      </div>
    </div>
  );
}