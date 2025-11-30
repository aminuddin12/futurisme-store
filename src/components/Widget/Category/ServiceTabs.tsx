'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';

interface ServiceItem {
  name: string;
  icon: string;
}

interface ServiceTabsProps {
  tabs: string[];
  data: Record<string, ServiceItem[]>;
}

export default function ServiceTabs({ tabs, data }: ServiceTabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-800 h-full flex flex-col">
      {/* Tab Headers */}
      <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide pb-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all
              ${activeTab === tab 
                ? 'bg-primary text-white shadow-md shadow-primary/30' 
                : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }
            `}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 relative">
        <AnimatePresence mode='wait'>
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-2 gap-3"
          >
            {data[activeTab]?.map((item, idx) => (
              <div 
                key={idx} 
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-700 border border-transparent hover:border-gray-200 dark:hover:border-gray-600 transition-all cursor-pointer group"
              >
                <Icon icon={item.icon} className="text-2xl text-primary mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-medium text-center text-gray-600 dark:text-gray-300">{item.name}</span>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}