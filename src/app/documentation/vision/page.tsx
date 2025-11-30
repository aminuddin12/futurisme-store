'use client';

import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function VisionDocsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-16"
    >
      {/* Header */}
      <div className="border-b border-gray-100 dark:border-gray-800 pb-8 text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4 border border-primary/20">
          <Icon icon="solar:star-bold-duotone" className="text-sm" />
          <span>Pengenalan Perusahaan</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
          Visi & Misi
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto md:mx-0">
          Menjelajahi tujuan fundamental dan arah masa depan Futurisme Store dalam merevolusi pengalaman belanja digital di Indonesia.
        </p>
      </div>

      {/* Vision Section */}
      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1">
            <div className="relative w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30 mb-6">
                <Icon icon="solar:telescope-bold-duotone" className="text-4xl" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-ping"></div>
                </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Visi Kami</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                "Menjadi platform e-commerce terdepan yang mengintegrasikan teknologi masa depan untuk menciptakan ekosistem belanja yang paling <span className="text-blue-500 font-bold">personal</span>, <span className="text-blue-500 font-bold">efisien</span>, dan <span className="text-blue-500 font-bold">berkelanjutan</span> di Asia Tenggara."
            </p>
        </div>
        <div className="order-1 md:order-2 relative h-64 md:h-80 bg-gray-100 dark:bg-gray-900 rounded-3xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-400/20 group-hover:opacity-80 transition-opacity duration-500"></div>
            {/* Abstract Vision Graphic Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
                <Icon icon="solar:globe-bold-duotone" className="text-9xl text-blue-500/30 group-hover:scale-110 transition-transform duration-700" />
            </div>
        </div>
      </section>

      {/* Mission Section */}
      <section>
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-3">
                <Icon icon="solar:rocket-2-bold-duotone" className="text-primary" />
                Misi Kami
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Langkah-langkah konkret yang kami ambil setiap hari.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
                { 
                    title: 'Inovasi Teknologi', 
                    desc: 'Mengembangkan fitur berbasis AI dan AR untuk pengalaman belanja yang imersif.', 
                    icon: 'solar:cpu-bolt-bold-duotone', 
                    color: 'text-purple-500', 
                    bg: 'bg-purple-50 dark:bg-purple-900/20' 
                },
                { 
                    title: 'Pemberdayaan UKM', 
                    desc: 'Menyediakan alat dan wawasan data bagi penjual lokal untuk bertumbuh.', 
                    icon: 'solar:shop-2-bold-duotone', 
                    color: 'text-orange-500', 
                    bg: 'bg-orange-50 dark:bg-orange-900/20' 
                },
                { 
                    title: 'Kepuasan Pelanggan', 
                    desc: 'Menjamin layanan pelanggan 24/7 dan logistik super cepat.', 
                    icon: 'solar:heart-angle-bold-duotone', 
                    color: 'text-red-500', 
                    bg: 'bg-red-50 dark:bg-red-900/20' 
                },
            ].map((mission, idx) => (
                <motion.div 
                    key={idx}
                    whileHover={{ y: -8 }}
                    className="p-8 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-none transition-all duration-300 group"
                >
                    <div className={`w-14 h-14 ${mission.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon icon={mission.icon} className={`text-3xl ${mission.color}`} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary transition-colors">{mission.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                        {mission.desc}
                    </p>
                </motion.div>
            ))}
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-gray-50 dark:bg-gray-900/30 rounded-3xl p-8 md:p-12 border border-gray-100 dark:border-gray-800">
        <div className="flex flex-col md:flex-row gap-10 items-start">
            <div className="w-full md:w-1/3">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Nilai Inti (Core Values)</h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
                    Nilai-nilai ini menjadi DNA dari setiap keputusan yang kami buat dan setiap baris kode yang kami tulis.
                </p>
                <div className="w-16 h-1 bg-primary rounded-full"></div>
            </div>
            <div className="w-full md:w-2/3 grid gap-6">
                {[
                    { label: 'Futuristic', desc: 'Selalu berpikir dua langkah ke depan.' },
                    { label: 'User-Centric', desc: 'Pengguna adalah pusat dari segalanya.' },
                    { label: 'Integrity', desc: 'Transparan dan jujur dalam setiap transaksi.' },
                    { label: 'Speed', desc: 'Kecepatan dalam pengiriman dan performa aplikasi.' },
                ].map((val, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800">
                        <Icon icon="solar:check-circle-bold-duotone" className="text-green-500 text-2xl shrink-0" />
                        <div>
                            <h4 className="font-bold text-gray-900 dark:text-white text-sm">{val.label}</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{val.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Navigation Footer */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-8 border-t border-gray-100 dark:border-gray-800">
        <Link href="/documentation" className="group flex flex-col p-4 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-primary dark:hover:border-primary hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all">
          <span className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Kembali Ke</span>
          <span className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors flex items-center gap-2">
            <Icon icon="solar:arrow-left-line-duotone" /> Pengenalan
          </span>
        </Link>
        
        <Link href="/documentation/getting-started" className="group flex flex-col items-end text-right p-4 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-primary dark:hover:border-primary hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all">
          <span className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Lanjut Ke</span>
          <span className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors flex items-center gap-2">
            Memulai <Icon icon="solar:arrow-right-line-duotone" />
          </span>
        </Link>
      </div>

    </motion.div>
  );
}