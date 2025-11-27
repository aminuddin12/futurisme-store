'use client';

import { Icon } from '@iconify/react';

export default function MobileCart() {
  return (
    <main className="bg-gray-50 dark:bg-gray-900 min-h-screen pb-24 pt-safe">
      {/* Header Sederhana Mobile */}
      <div className="bg-white dark:bg-gray-950 px-6 py-4 shadow-sm sticky top-0 z-10">
        <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
          <Icon icon="solar:cart-3-bold-duotone" className="text-primary" />
          Keranjang Belanja
        </h1>
      </div>

      {/* Konten Kosong */}
      <div className="flex flex-col items-center justify-center h-[60vh] text-gray-400 dark:text-gray-500 px-6 text-center">
        <div className="w-20 h-20 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-sm mb-4">
          <Icon icon="solar:cart-large-minimalistic-line-duotone" className="text-4xl opacity-50" />
        </div>
        <p className="font-medium">Keranjang Anda Kosong</p>
        <p className="text-xs mt-1">Belum ada produk yang ditambahkan. Yuk mulai belanja!</p>
        
        <button className="mt-6 px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-full shadow-lg shadow-primary/30 hover:bg-green-600 transition-all">
            Lihat Produk
        </button>
      </div>
    </main>
  );
}