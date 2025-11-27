'use client';

import { Icon } from '@iconify/react';

export default function MobileProfile() {
  return (
    <main className="bg-gray-50 dark:bg-gray-900 min-h-screen pb-24">
      
      {/* Header Profile Cover (Sedikit lebih estetik) */}
      <div className="h-40 bg-gradient-to-r from-primary to-green-400 relative">
        <div className="absolute -bottom-10 left-6">
            <div className="w-24 h-24 rounded-full bg-gray-200 border-4 border-white dark:border-gray-900 overflow-hidden shadow-md">
                {/* Avatar Placeholder */}
                <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">
                    <Icon icon="solar:user-bold" className="text-4xl" />
                </div>
            </div>
        </div>
      </div>

      <div className="px-6 mt-12">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Pengguna Tamu</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">guest@example.com</p>
        
        <div className="mt-4 flex gap-2">
            <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-2 py-1 rounded">Member Silver</span>
        </div>
      </div>

      {/* Menu List Kosong */}
      <div className="px-6 mt-8 space-y-3">
         <div className="p-4 bg-white dark:bg-gray-950 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-3 text-gray-700 dark:text-gray-200">
                <Icon icon="solar:bag-3-bold-duotone" className="text-xl text-primary" />
                <span className="font-medium text-sm">Pesanan Saya</span>
            </div>
            <Icon icon="solar:alt-arrow-right-linear" className="text-gray-400" />
         </div>
         
         <div className="p-4 bg-white dark:bg-gray-950 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-3 text-gray-700 dark:text-gray-200">
                <Icon icon="solar:heart-bold-duotone" className="text-xl text-red-500" />
                <span className="font-medium text-sm">Favorit</span>
            </div>
            <Icon icon="solar:alt-arrow-right-linear" className="text-gray-400" />
         </div>

         <div className="p-4 bg-white dark:bg-gray-950 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-3 text-gray-700 dark:text-gray-200">
                <Icon icon="solar:settings-bold-duotone" className="text-xl text-gray-500" />
                <span className="font-medium text-sm">Pengaturan Akun</span>
            </div>
            <Icon icon="solar:alt-arrow-right-linear" className="text-gray-400" />
         </div>
      </div>
    </main>
  );
}