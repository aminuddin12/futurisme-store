'use client';

import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const endpoints = [
  {
    method: 'GET',
    path: '/api/products',
    desc: 'Mengambil daftar semua produk.',
    response: '200 OK: { success: true, data: [...] }',
    color: 'text-green-500 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
  },
  {
    method: 'POST',
    path: '/api/auth/login',
    desc: 'Otentikasi pengguna dan mendapatkan token.',
    response: '200 OK: { token: "...", user: {...} }',
    color: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
  },
  {
    method: 'POST',
    path: '/api/auth/register',
    desc: 'Mendaftarkan pengguna baru.',
    response: '201 Created: { success: true, message: "..." }',
    color: 'text-orange-500 bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800'
  },
  {
    method: 'GET',
    path: '/api/web-config',
    desc: 'Mengambil konfigurasi global aplikasi.',
    response: '200 OK: { app_name: "...", features: {...} }',
    color: 'text-purple-500 bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800'
  }
];

export default function ApiDocsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-12"
    >
      <div className="border-b border-gray-100 dark:border-gray-800 pb-6">
        <div className="flex items-center gap-2 text-sm text-primary font-bold mb-2">
          <Icon icon="solar:server-path-bold-duotone" className="text-lg" />
          <span>Pengembang</span>
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
          API Reference
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-4xl">
          Dokumentasi endpoint API yang disimulasikan oleh Mock Service Worker (MSW). Gunakan ServiceFetcher untuk memanggil endpoint ini.
        </p>
      </div>

      <div className="space-y-6">
        {endpoints.map((ep, idx) => (
            <div key={idx} className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm hover:shadow-md transition-all">
                <div className="flex flex-col md:flex-row md:items-center justify-between p-4 md:p-6 gap-4 border-b border-gray-50 dark:border-gray-800/50">
                    <div className="flex items-center gap-3 font-mono">
                        <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${ep.color}`}>
                            {ep.method}
                        </span>
                        <span className="text-gray-700 dark:text-gray-200 font-bold">{ep.path}</span>
                    </div>
                    <div className="text-xs text-gray-400 flex items-center gap-1">
                        <Icon icon="solar:shield-check-bold-duotone" className="text-green-500" />
                        Secured
                    </div>
                </div>
                
                <div className="p-6 bg-gray-50/50 dark:bg-gray-950/30">
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{ep.desc}</p>
                    
                    <div className="bg-gray-900 rounded-xl p-4 overflow-x-auto">
                        <p className="text-gray-500 text-xs font-bold mb-2 uppercase">Contoh Response:</p>
                        <code className="text-sm font-mono text-green-400">
                            {ep.response}
                        </code>
                    </div>
                </div>
            </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-8 border-t border-gray-100 dark:border-gray-800">
        <Link href="/documentation/components" className="group flex flex-col p-4 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-primary dark:hover:border-primary hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all">
          <span className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Kembali Ke</span>
          <span className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors flex items-center gap-2">
            <Icon icon="solar:arrow-left-line-duotone" /> Komponen UI
          </span>
        </Link>
        
        <Link href="/documentation" className="group flex flex-col items-end text-right p-4 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-primary dark:hover:border-primary hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all">
          <span className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Selesai</span>
          <span className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors flex items-center gap-2">
            Halaman Utama <Icon icon="solar:home-2-bold-duotone" />
          </span>
        </Link>
      </div>

    </motion.div>
  );
}