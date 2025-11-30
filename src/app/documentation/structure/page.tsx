'use client';

import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function StructureDocsPage() {
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
          <Icon icon="solar:folder-path-connect-bold-duotone" className="text-lg" />
          <span>Pengembang</span>
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
          Struktur Proyek
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-4xl">
          Memahami organisasi file dan folder dalam Futurisme Store untuk navigasi pengembangan yang efisien.
        </p>
      </div>

      {/* Directory Tree Visual */}
      <div className="bg-gray-900 rounded-2xl p-8 shadow-lg border border-gray-800 overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4 opacity-20">
          <Icon icon="solar:code-square-bold-duotone" className="text-9xl text-primary" />
        </div>
        
        <div className="relative z-10 font-mono text-sm text-gray-300 space-y-4">
            <div className="flex items-center gap-2 text-primary font-bold">
                <Icon icon="solar:folder-bold-duotone" /> src/
            </div>
            
            <div className="pl-6 space-y-4 border-l border-gray-700 ml-2">
                {/* App Router */}
                <div>
                    <div className="flex items-center gap-2 text-blue-400 font-bold mb-2">
                        <Icon icon="solar:folder-bold-duotone" /> app/
                    </div>
                    <p className="pl-6 text-gray-500 text-xs mb-2">// Routing berbasis file (App Router)</p>
                    <ul className="pl-6 space-y-1 text-gray-400">
                        <li className="flex items-center gap-2"><Icon icon="solar:file-text-bold-duotone" /> layout.tsx <span className="text-gray-600">- Root Layout</span></li>
                        <li className="flex items-center gap-2"><Icon icon="solar:file-text-bold-duotone" /> page.tsx <span className="text-gray-600">- Home Page</span></li>
                        <li className="flex items-center gap-2"><Icon icon="solar:folder-bold-duotone" className="text-blue-400" /> (routes) <span className="text-gray-600">- /chat, /cart, dll</span></li>
                    </ul>
                </div>

                {/* Components */}
                <div>
                    <div className="flex items-center gap-2 text-green-400 font-bold mb-2">
                        <Icon icon="solar:folder-bold-duotone" /> components/
                    </div>
                    <p className="pl-6 text-gray-500 text-xs mb-2">// Komponen UI Reusable</p>
                    <div className="pl-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            { name: 'Navbar', desc: 'Navigasi Atas & Bawah' },
                            { name: 'Chat', desc: 'Sistem Chat Lengkap' },
                            { name: 'Category', desc: 'Grid & Filter Kategori' },
                            { name: 'Product', desc: 'Card & Detail Produk' },
                            { name: 'UI', desc: 'Komponen Dasar (Modal, dll)' },
                            { name: 'Wrappers', desc: 'Logic Wrapper (Auth, Config)' },
                        ].map((comp) => (
                            <div key={comp.name} className="flex items-center gap-2 p-2 rounded bg-gray-800/50 border border-gray-700/50">
                                <Icon icon="solar:box-bold-duotone" className="text-green-500" />
                                <span>{comp.name}</span>
                                <span className="text-gray-600 text-xs ml-auto">{comp.desc}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Data & Context */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <div className="flex items-center gap-2 text-yellow-400 font-bold mb-2">
                            <Icon icon="solar:folder-bold-duotone" /> data/
                        </div>
                        <p className="pl-6 text-gray-500 text-xs mb-1">// Dummy Data JSON</p>
                        <ul className="pl-6 space-y-1 text-gray-400">
                            <li>• products.json</li>
                            <li>• users.json</li>
                            <li>• web-config.json</li>
                        </ul>
                    </div>
                    <div>
                        <div className="flex items-center gap-2 text-purple-400 font-bold mb-2">
                            <Icon icon="solar:folder-bold-duotone" /> context/
                        </div>
                        <p className="pl-6 text-gray-500 text-xs mb-1">// React Context Global</p>
                        <ul className="pl-6 space-y-1 text-gray-400">
                            <li>• LanguageContext</li>
                            <li>• WebConfigContext</li>
                            <li>• AuthModalContext</li>
                        </ul>
                    </div>
                </div>

                {/* Services & Mocks */}
                <div>
                     <div className="flex items-center gap-2 text-pink-400 font-bold mb-2">
                        <Icon icon="solar:folder-bold-duotone" /> services/ & mocks/
                    </div>
                    <p className="pl-6 text-gray-500 text-xs">// API Handling & MSW Simulation</p>
                </div>
            </div>
        </div>
      </div>

      {/* Penjelasan Detail */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <Icon icon="solar:cpu-bolt-bold-duotone" className="text-primary" />
                Logika Aplikasi
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Aplikasi menggunakan <strong>Mock Service Worker (MSW)</strong> untuk mensimulasikan backend. 
                Logika fetch data ditangani oleh <code>ServiceFetcher.ts</code> yang secara otomatis menyuntikkan header keamanan.
            </p>
        </div>
        <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <Icon icon="solar:palette-bold-duotone" className="text-primary" />
                Styling & UI
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Styling menggunakan <strong>Tailwind CSS v4</strong> dengan konfigurasi tema terpusat. 
                Komponen UI dirancang modular untuk kemudahan penggunaan ulang dan konsistensi visual.
            </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-8 border-t border-gray-100 dark:border-gray-800">
        <Link href="/documentation/getting-started" className="group flex flex-col p-4 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-primary dark:hover:border-primary hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all">
          <span className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Kembali Ke</span>
          <span className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors flex items-center gap-2">
            <Icon icon="solar:arrow-left-line-duotone" /> Memulai
          </span>
        </Link>
        
        <Link href="/documentation/components" className="group flex flex-col items-end text-right p-4 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-primary dark:hover:border-primary hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all">
          <span className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Lanjut Ke</span>
          <span className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors flex items-center gap-2">
            Komponen UI <Icon icon="solar:arrow-right-line-duotone" />
          </span>
        </Link>
      </div>

    </motion.div>
  );
}