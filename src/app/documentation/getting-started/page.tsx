'use client';

import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function GettingStartedPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-12"
    >
      {/* Header */}
      <div className="border-b border-gray-100 dark:border-gray-800 pb-6">
        <div className="flex items-center gap-2 text-sm text-primary font-bold mb-2">
          <Icon icon="solar:book-2-bold-duotone" className="text-lg" />
          <span>Panduan Pengguna</span>
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
          Memulai dengan Futurisme Store
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-4xl">
          Pelajari cara menginstal, menjalankan, dan mengonfigurasi proyek Futurisme Store di lingkungan lokal Anda dalam hitungan menit.
        </p>
      </div>

      {/* Prerequisites */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Icon icon="solar:list-check-bold-duotone" className="text-primary" />
          Prasyarat
        </h2>
        <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/50 rounded-xl p-6">
          <p className="text-blue-800 dark:text-blue-200 mb-4 font-medium">
            Sebelum memulai, pastikan Anda telah menginstal perangkat lunak berikut:
          </p>
          <ul className="space-y-3">
            {[
              { label: 'Node.js', version: 'v18.17.0 atau lebih baru' },
              { label: 'npm / yarn / pnpm', version: 'Versi terbaru' },
              { label: 'Git', version: 'Untuk kloning repositori' },
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 bg-white dark:bg-gray-900 p-3 rounded-lg shadow-sm border border-blue-100 dark:border-blue-800/30">
                <Icon icon="solar:check-circle-bold-duotone" className="text-green-500 text-xl shrink-0" />
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <span className="font-bold text-gray-800 dark:text-gray-200">{item.label}</span>
                  <span className="hidden sm:inline text-gray-400">•</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{item.version}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Installation Steps */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Icon icon="solar:download-square-bold-duotone" className="text-primary" />
          Instalasi
        </h2>
        
        <div className="space-y-6">
          {/* Step 1 */}
          <div className="group relative pl-8 border-l-2 border-gray-200 dark:border-gray-800">
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-white dark:border-gray-950"></div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">1. Kloning Repositori</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3 text-sm">
              Salin kode sumber proyek ke komputer lokal Anda menggunakan Git.
            </p>
            <div className="bg-gray-900 rounded-xl p-4 font-mono text-sm text-gray-300 overflow-x-auto shadow-lg group-hover:shadow-xl transition-shadow">
              <div className="flex justify-between items-start">
                <code>git clone https://github.com/username/futurisme-store.git</code>
                <button className="text-gray-500 hover:text-white transition-colors" title="Salin">
                  <Icon icon="solar:copy-linear" className="text-lg" />
                </button>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="group relative pl-8 border-l-2 border-gray-200 dark:border-gray-800">
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gray-300 dark:bg-gray-700 border-4 border-white dark:border-gray-950 group-hover:bg-primary transition-colors"></div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">2. Instal Dependensi</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3 text-sm">
              Masuk ke direktori proyek dan instal paket-paket yang diperlukan.
            </p>
            <div className="bg-gray-900 rounded-xl p-4 font-mono text-sm text-gray-300 overflow-x-auto">
              <p className="text-gray-500 select-none"># Masuk ke direktori</p>
              <p className="mb-2">cd futurisme-store</p>
              <p className="text-gray-500 select-none"># Instal paket (pilih satu)</p>
              <p>npm install</p>
              <p className="text-gray-500 italic text-xs mt-1">atau `yarn install` / `pnpm install`</p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="group relative pl-8 border-l-2 border-gray-200 dark:border-gray-800">
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gray-300 dark:bg-gray-700 border-4 border-white dark:border-gray-950 group-hover:bg-primary transition-colors"></div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">3. Jalankan Server Pengembangan</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3 text-sm">
              Mulai server lokal untuk melihat aplikasi berjalan di browser.
            </p>
            <div className="bg-gray-900 rounded-xl p-4 font-mono text-sm text-green-400 overflow-x-auto">
              <p>npm run dev</p>
            </div>
            <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl text-sm text-green-800 dark:text-green-200 flex items-center gap-3">
              <Icon icon="solar:info-circle-bold-duotone" className="text-xl shrink-0" />
              <p>Aplikasi akan berjalan di <span className="font-bold underline">http://localhost:3000</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* Next Steps Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-8 border-t border-gray-100 dark:border-gray-800">
        <div></div> {/* Empty Left */}
        <Link href="/documentation/structure" className="group flex flex-col items-end text-right p-4 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-primary dark:hover:border-primary hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all">
          <span className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Lanjut Ke</span>
          <span className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors flex items-center gap-2">
            Struktur Proyek <Icon icon="solar:arrow-right-line-duotone" />
          </span>
        </Link>
      </div>

    </motion.div>
  );
}