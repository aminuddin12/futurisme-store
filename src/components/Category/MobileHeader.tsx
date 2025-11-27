'use client';

import { Icon } from '@iconify/react';

export default function MobileHeader() {
  return (
    <div className="bg-white dark:bg-gray-950 px-6 py-4 shadow-sm sticky top-0 z-10">
      <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
        <Icon icon="solar:server-2-bold-duotone" className="text-primary" />
        Kategori Produk
      </h1>
    </div>
  );
}