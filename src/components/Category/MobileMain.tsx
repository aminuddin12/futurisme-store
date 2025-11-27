'use client';

import { Icon } from '@iconify/react';

export default function MobileMain() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-gray-400 dark:text-gray-500 px-6 text-center">
      <div className="w-20 h-20 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-sm mb-4">
        <Icon icon="solar:server-2-line-duotone" className="text-4xl opacity-50" />
      </div>
      <p className="font-medium">Halaman Kategori</p>
      <p className="text-xs mt-1">Telusuri berbagai macam produk berdasarkan kategori di sini.</p>
    </div>
  );
}