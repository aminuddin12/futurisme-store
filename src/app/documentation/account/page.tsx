'use client';

import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AccountDocsPage() {
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
          <Icon icon="solar:user-id-bold-duotone" className="text-lg" />
          <span>Panduan Pengguna</span>
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
          Akun & Keamanan
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-4xl">
          Pelajari cara mengelola profil Anda, mengamankan akun, dan menggunakan fitur autentikasi di Futurisme Store.
        </p>
      </div>

      {/* Content Sections */}
      <div className="grid gap-8">
        
        {/* Register & Login */}
        <section className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
                <Icon icon="solar:login-3-bold-duotone" className="text-2xl" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Registrasi & Login</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
                Kami menyediakan dua metode masuk: menggunakan email/password tradisional atau login sosial (Google/Facebook). 
                Popup login dapat diakses dari navigasi atas atau halaman checkout.
            </p>
            <div className="flex gap-2 flex-wrap">
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs font-mono text-gray-600 dark:text-gray-300">enableLoginPopup: true</span>
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs font-mono text-gray-600 dark:text-gray-300">enableSocialLogin: true</span>
            </div>
        </section>

        {/* Profile Management */}
        <section className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/20 rounded-xl flex items-center justify-center text-purple-600 dark:text-purple-400 mb-4">
                <Icon icon="solar:user-circle-bold-duotone" className="text-2xl" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Manajemen Profil</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
                Di halaman Dashboard, Anda dapat melihat ringkasan aktivitas, status member, dan mengubah data diri.
            </p>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-2">
                    <Icon icon="solar:check-circle-bold-duotone" className="text-green-500" />
                    Ubah Foto Profil
                </li>
                <li className="flex items-center gap-2">
                    <Icon icon="solar:check-circle-bold-duotone" className="text-green-500" />
                    Lihat Riwayat Pesanan
                </li>
                <li className="flex items-center gap-2">
                    <Icon icon="solar:check-circle-bold-duotone" className="text-green-500" />
                    Atur Alamat Pengiriman
                </li>
            </ul>
        </section>

      </div>

      {/* Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-8 border-t border-gray-100 dark:border-gray-800">
        <Link href="/documentation/getting-started" className="group flex flex-col p-4 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-primary dark:hover:border-primary hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all">
          <span className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Kembali Ke</span>
          <span className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors flex items-center gap-2">
            <Icon icon="solar:arrow-left-line-duotone" /> Memulai
          </span>
        </Link>
        
        <Link href="/documentation/orders" className="group flex flex-col items-end text-right p-4 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-primary dark:hover:border-primary hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all">
          <span className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Lanjut Ke</span>
          <span className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors flex items-center gap-2">
            Pemesanan <Icon icon="solar:arrow-right-line-duotone" />
          </span>
        </Link>
      </div>

    </motion.div>
  );
}