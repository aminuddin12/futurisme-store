'use client';

import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function DocsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-12"
    >
      {/* Header Section */}
      <div className="space-y-4 border-b border-gray-100 dark:border-gray-800 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-2 border border-primary/20">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          Versi 2.1.0
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Dokumentasi Futurisme
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl leading-relaxed">
          Selamat datang di pusat dokumentasi resmi Futurisme Store. Temukan panduan lengkap, referensi API, dan praktik terbaik untuk mengembangkan dan menggunakan platform kami.
        </p>
        <div className="flex gap-4 pt-4">
           <Link href="/documentation/getting-started">
             <button className="px-6 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/30 hover:bg-green-600 transition-all flex items-center gap-2">
               Mulai Sekarang
               <Icon icon="solar:arrow-right-line-duotone" className="text-lg" />
             </button>
           </Link>
           <button className="px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all flex items-center gap-2">
             <Icon icon="solar:github-bold" className="text-lg" />
             Lihat Repositori
           </button>
        </div>
      </div>

      {/* Quick Links Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
            { title: 'Panduan Pemula', icon: 'solar:book-2-bold-duotone', desc: 'Pelajari dasar-dasar penggunaan aplikasi dari nol.', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
            { title: 'Komponen UI', icon: 'solar:palette-bold-duotone', desc: 'Jelajahi pustaka komponen desain sistem kami.', color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
            { title: 'Integrasi API', icon: 'solar:code-square-bold-duotone', desc: 'Dokumentasi lengkap untuk endpoint dan autentikasi.', color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/20' },
        ].map((item, idx) => (
            <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                className="p-6 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-all cursor-pointer group"
            >
                <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon icon={item.icon} className={`text-2xl ${item.color}`} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{item.desc}</p>
            </motion.div>
        ))}
      </div>

      {/* Content Section Example */}
      <div className="prose dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Icon icon="solar:star-fall-bold-duotone" className="text-primary" />
            Fitur Unggulan
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
            Futurisme Store dibangun dengan teknologi terkini untuk memberikan performa maksimal. Berikut adalah beberapa teknologi inti yang kami gunakan:
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
                { label: 'Next.js 16', desc: 'Framework React terbaru dengan performa tinggi.' },
                { label: 'Tailwind CSS v4', desc: 'Styling engine modern yang cepat dan fleksibel.' },
                { label: 'Framer Motion', desc: 'Pustaka animasi deklaratif untuk interaksi halus.' },
                { label: 'Mock Service Worker', desc: 'Simulasi API yang realistis untuk pengembangan.' },
            ].map((tech, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
                    <Icon icon="solar:check-circle-bold-duotone" className="text-green-500 text-xl mt-0.5 shrink-0" />
                    <div>
                        <h4 className="font-bold text-gray-900 dark:text-white text-sm">{tech.label}</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{tech.desc}</p>
                    </div>
                </div>
            ))}
        </div>
      </div>

    </motion.div>
  );
}