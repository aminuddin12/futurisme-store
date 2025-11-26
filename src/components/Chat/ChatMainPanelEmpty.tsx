'use client';

import { Icon } from '@iconify/react';

export default function ChatMainPanelEmpty() {
  return (
    <div className="w-full flex flex-col items-center justify-center h-full bg-gray-50 dark:bg-gray-950 text-center p-8">
      <div className="mb-6 relative">
        <div className="w-32 h-32 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center shadow-sm relative z-10">
             <Icon icon="fluent:chat-multiple-24-filled" className="text-6xl text-primary/20" />
        </div>
        {/* Decor circles */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-full animate-ping opacity-20"></div>
      </div>
      
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
        Futurisme Store Chat
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md leading-relaxed">
        Pilih percakapan dari daftar di sebelah kiri atau mulai chat baru untuk bertanya seputar produk dan pesanan.
      </p>
      
      <div className="mt-8 flex items-center gap-2 text-xs text-gray-400 bg-white dark:bg-gray-900 px-4 py-2 rounded-full shadow-sm border border-gray-100 dark:border-gray-800">
        <Icon icon="fluent:lock-closed-24-regular" />
        Pesan Anda terenkripsi dan aman.
      </div>
    </div>
  );
}