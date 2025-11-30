/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Link from 'next/link';
import ServiceTabs from './ServiceTabs';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

interface CategoryTypeThreeProps {
  data: any;
}

export default function CategoryTypeThree({ data }: CategoryTypeThreeProps) {
  const { leftContent, rightContent, popularItems } = data;

  return (
    <div className="space-y-6">
      {/* Baris Atas: Split Kolom */}
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Kolom Kiri (65%) - Grid Card Besar */}
        <div className="w-full lg:w-[65%]">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm h-full">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-primary rounded-full"></span>
                    {leftContent.title}
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {leftContent.items.map((item: any) => (
                    <Link 
                        key={item.id} 
                        href={item.href}
                        className="group relative rounded-xl overflow-hidden aspect-[3/4]"
                    >
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-3">
                            <span className="text-white text-sm font-bold group-hover:text-primary transition-colors">{item.name}</span>
                        </div>
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

      {/* Baris Bawah: Marquee Popular Items */}
      <div className="relative w-full overflow-hidden bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 py-3 shadow-sm group/marquee">
         <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white dark:from-gray-900 to-transparent z-10"></div>
         <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white dark:from-gray-900 to-transparent z-10"></div>
         
         <div className="flex items-center gap-2 px-4 mb-2 md:mb-0 md:absolute md:left-4 md:top-1/2 md:-translate-y-1/2 md:z-20 md:bg-white md:dark:bg-gray-900 md:pr-4">
            <div className="p-1 bg-red-100 dark:bg-red-900/30 rounded text-red-500">
                <Icon icon="solar:fire-bold-duotone" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Populer:</span>
         </div>

         <motion.div 
            className="flex gap-4 whitespace-nowrap pl-4 md:pl-32"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ 
                repeat: Infinity, 
                ease: "linear", 
                duration: 20, 
            }}
            // Hover untuk pause animasi
            whileHover={{ animationPlayState: "paused" }} 
         >
            {/* Render item 2x untuk loop seamless */}
            {[...popularItems, ...popularItems].map((item: any, idx: number) => (
                <Link 
                    key={idx} 
                    href={item.href}
                    className="px-4 py-1.5 rounded-full bg-gray-50 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 hover:bg-primary hover:text-white transition-colors border border-gray-100 dark:border-gray-700"
                >
                    {item.name}
                </Link>
            ))}
         </motion.div>
      </div>
    </div>
  );
}