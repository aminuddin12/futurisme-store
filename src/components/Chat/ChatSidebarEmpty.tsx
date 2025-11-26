'use client';

import { Icon } from '@iconify/react';

export default function ChatSidebarEmpty() {
  return (
    <div className="w-full md:w-[35%] border-r border-gray-100 dark:border-gray-800 flex flex-col bg-white dark:bg-gray-900 h-full">
      
      {/* Sidebar Header */}
      <div className="px-5 h-[60px] shrink-0 flex items-center justify-between border-b border-gray-50 dark:border-gray-800">
        <h3 className="font-bold text-gray-800 dark:text-gray-100 text-lg">Pesan</h3>
        <div className="bg-gray-100 dark:bg-gray-800 text-xs font-medium px-2 py-1 rounded-full text-gray-500 dark:text-gray-400">
            0 Chat
        </div>
      </div>

      {/* Empty State Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-gray-400 dark:text-gray-500">
        <div className="w-20 h-20 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
            <Icon icon="fluent:chat-bubbles-question-24-regular" className="text-4xl opacity-50" />
        </div>
        <h4 className="font-bold text-gray-600 dark:text-gray-300 mb-1">Belum ada pesan</h4>
        <p className="text-xs leading-relaxed max-w-[200px]">
          Pesan dari admin atau notifikasi toko akan muncul di sini.
        </p>
        
        {/* Skeleton Loading Effect (Optional visual filler) */}
        <div className="w-full mt-8 space-y-3 opacity-30">
            {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-3">
                    <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full shrink-0"></div>
                    <div className="flex-1 space-y-2 py-1">
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}