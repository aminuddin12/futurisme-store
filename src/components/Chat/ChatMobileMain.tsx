'use client';

import { Icon } from '@iconify/react';

export default function ChatMobileMain() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-gray-400 dark:text-gray-500 px-6 text-center md:hidden">
      <div className="w-20 h-20 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-sm mb-4">
        <Icon icon="solar:chat-line-broken" className="text-4xl opacity-50" />
      </div>
      <p className="font-medium">Belum Ada Chat</p>
      <p className="text-xs mt-1">Riwayat percakapan Anda dengan penjual akan muncul di sini.</p>
    </div>
  );
}