'use client';

import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function OrdersDocsPage() {
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
          <Icon icon="solar:bag-check-bold-duotone" className="text-lg" />
          <span>Panduan Pengguna</span>
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
          Alur Pemesanan
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-4xl">
          Panduan langkah demi langkah mulai dari mencari produk, menambahkan ke keranjang, hingga menyelesaikan pembayaran.
        </p>
      </div>

      {/* Step by Step */}
      <div className="relative border-l-2 border-gray-200 dark:border-gray-800 ml-4 md:ml-6 space-y-10 py-2">
        {[
            { title: 'Cari Produk', desc: 'Gunakan fitur pencarian global di navbar atau jelajahi kategori di halaman utama untuk menemukan barang impian Anda.', icon: 'solar:magnifer-bold-duotone' },
            { title: 'Tambah ke Keranjang', desc: 'Klik tombol "Keranjang" pada kartu produk. Anda bisa mengubah jumlah barang melalui widget keranjang yang melayang.', icon: 'solar:cart-large-minimalistic-bold-duotone' },
            { title: 'Checkout', desc: 'Periksa kembali pesanan Anda di halaman Cart, gunakan voucher jika ada, dan lanjutkan ke pembayaran.', icon: 'solar:card-send-bold-duotone' },
            { title: 'Lacak Pengiriman', desc: 'Pantau status paket Anda secara real-time melalui dashboard akun pada menu "Pesanan Saya".', icon: 'solar:delivery-bold-duotone' },
        ].map((step, idx) => (
            <div key={idx} className="relative pl-8 md:pl-12 group">
                {/* Dot Indicator */}
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white dark:bg-gray-900 border-4 border-primary shadow-sm group-hover:scale-125 transition-transform"></div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
                    <span className="text-primary">Langkah {idx + 1}:</span> {step.title}
                </h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl border border-gray-100 dark:border-gray-800 flex gap-4">
                    <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center text-primary shrink-0 shadow-sm">
                        <Icon icon={step.icon} className="text-2xl" />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed self-center">
                        {step.desc}
                    </p>
                </div>
            </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-8 border-t border-gray-100 dark:border-gray-800">
        <Link href="/documentation/account" className="group flex flex-col p-4 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-primary dark:hover:border-primary hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all">
          <span className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Kembali Ke</span>
          <span className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors flex items-center gap-2">
            <Icon icon="solar:arrow-left-line-duotone" /> Akun & Keamanan
          </span>
        </Link>
        <div></div> {/* Empty Right */}
      </div>

    </motion.div>
  );
}