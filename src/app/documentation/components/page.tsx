'use client';

import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const components = [
  {
    name: 'Tombol (Button)',
    description: 'Komponen tombol standar dengan varian primary, secondary, dan icon.',
    icon: 'solar:cursor-square-bold-duotone',
    usage: '<button className="btn-primary">Klik Saya</button>'
  },
  {
    name: 'Kartu Produk',
    description: 'Menampilkan ringkasan produk dengan gambar, harga, dan rating.',
    icon: 'solar:bag-heart-bold-duotone',
    usage: '<ProductCard data={product} />'
  },
  {
    name: 'Popup Modal',
    description: 'Overlay untuk konten tambahan seperti Login atau Promo.',
    icon: 'solar:maximize-square-minimalistic-bold-duotone',
    usage: '<Modal isOpen={isOpen} onClose={close} />'
  },
  {
    name: 'Input Form',
    description: 'Elemen input teks dengan ikon dan validasi style.',
    icon: 'solar:text-field-bold-duotone',
    usage: '<Input icon="solar:user" placeholder="Nama" />'
  }
];

export default function ComponentsDocsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-12"
    >
      <div className="border-b border-gray-100 dark:border-gray-800 pb-6">
        <div className="flex items-center gap-2 text-sm text-primary font-bold mb-2">
          <Icon icon="solar:palette-bold-duotone" className="text-lg" />
          <span>Pengembang</span>
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
          Pustaka Komponen
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-4xl">
          Kumpulan komponen UI siap pakai yang mempercepat pengembangan antarmuka yang konsisten dan menarik.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {components.map((comp, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 group"
          >
            <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary text-2xl">
                    <Icon icon={comp.icon} />
                </div>
                <span className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-[10px] font-mono text-gray-500">UI Component</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                {comp.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 min-h-[40px]">
                {comp.description}
            </p>
            <div className="bg-gray-50 dark:bg-gray-950 p-3 rounded-lg border border-gray-200 dark:border-gray-800">
                <code className="text-xs font-mono text-blue-600 dark:text-blue-400 block overflow-x-auto">
                    {comp.usage}
                </code>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-8 border-t border-gray-100 dark:border-gray-800">
        <Link href="/documentation/structure" className="group flex flex-col p-4 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-primary dark:hover:border-primary hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all">
          <span className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Kembali Ke</span>
          <span className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors flex items-center gap-2">
            <Icon icon="solar:arrow-left-line-duotone" /> Struktur Proyek
          </span>
        </Link>
        
        <Link href="/documentation/api" className="group flex flex-col items-end text-right p-4 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-primary dark:hover:border-primary hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all">
          <span className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Lanjut Ke</span>
          <span className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors flex items-center gap-2">
            API Reference <Icon icon="solar:arrow-right-line-duotone" />
          </span>
        </Link>
      </div>
    </motion.div>
  );
}