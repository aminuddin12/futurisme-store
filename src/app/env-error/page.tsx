"use client";

import { Icon } from "@iconify/react";
import { motion, type Variants } from "framer-motion";

export default function EnvErrorPage() {
  // Variasi animasi untuk container (stagger children)
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Jeda antar elemen anak
        delayChildren: 0.1,
      },
    },
  };

  // Variasi animasi untuk setiap item (muncul dari bawah)
  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950 text-center px-4 py-8 relative overflow-hidden">
      {/* Background Decor - Tetap sama */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-[-10%] right-[-10%] w-[40vh] h-[40vh] bg-red-500/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 7, repeat: Infinity }}
          className="absolute bottom-[-10%] left-[-10%] w-[50vh] h-[50vh] bg-orange-500/5 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-lg mx-auto"
      >
        {/* Ikon Error */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center mb-6"
        >
          <div className="w-24 h-24 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center border-4 border-red-50 dark:border-red-900/30 shadow-lg shadow-red-200/50 dark:shadow-none">
            <Icon
              icon="solar:shield-warning-bold-duotone"
              className="text-5xl text-red-500 animate-pulse"
            />
          </div>
        </motion.div>

        {/* Judul & Deskripsi */}
        <motion.h1
          variants={itemVariants}
          className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-3 tracking-tight"
        >
          Konfigurasi Tidak Valid
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-gray-500 dark:text-gray-400 mb-8 text-sm md:text-base leading-relaxed px-4"
        >
          Kunci API publik atau rahasia yang dikonfigurasi dalam file{" "}
          <code className="bg-gray-200 dark:bg-gray-800 px-1.5 py-0.5 rounded text-red-500 font-mono text-xs font-bold border border-gray-300 dark:border-gray-700">
            .env
          </code>{" "}
          tidak cocok dengan server atau database.
        </motion.p>

        {/* Action Box - Diperbaiki agar tidak overflow */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-xl shadow-gray-100 dark:shadow-none text-left overflow-hidden relative group"
        >
          {/* Dekorasi halus di dalam box */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>

          <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2 relative z-10">
            <div className="p-1.5 bg-primary/10 rounded-lg text-primary">
              <Icon
                icon="solar:checklist-minimalistic-bold-duotone"
                className="text-lg"
              />
            </div>
            Langkah Perbaikan:
          </h3>

          <ul className="space-y-3 text-xs md:text-sm text-gray-600 dark:text-gray-400 relative z-10">
            <li className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <span className="mt-0.5 text-red-500 text-lg">•</span>
              <span className="leading-snug">
                Pastikan file{" "}
                <code className="font-mono font-bold text-gray-800 dark:text-gray-200">
                  .env.development
                </code>{" "}
                atau{" "}
                <code className="font-mono font-bold text-gray-800 dark:text-gray-200">
                  .env.production
                </code>{" "}
                ada di root project.
              </span>
            </li>
            <li className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <span className="mt-0.5 text-red-500 text-lg">•</span>
              <span className="leading-snug">
                Periksa nilai variabel{" "}
                <code className="font-mono font-bold text-gray-800 dark:text-gray-200 break-all">
                  NEXT_PUBLIC_API_PUBLIC_KEY
                </code>
                .
              </span>
            </li>
            <li className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <span className="mt-0.5 text-red-500 text-lg">•</span>
              <span className="leading-snug">
                Periksa nilai variabel{" "}
                <code className="font-mono font-bold text-gray-800 dark:text-gray-200 break-all">
                  NEXT_PUBLIC_API_SECRET_KEY
                </code>
                .
              </span>
            </li>
            <li className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <span className="mt-0.5 text-red-500 text-lg">•</span>
              <span className="leading-snug">
                Restart server pengembangan (
                <code className="font-mono font-bold text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 px-1 rounded">
                  npm run dev
                </code>
                ) setelah mengubah file env.
              </span>
            </li>
          </ul>
        </motion.div>

        {/* Tombol Coba Lagi */}
        <motion.div
          variants={itemVariants}
          className="mt-8 flex justify-center"
        >
          <button
            onClick={() => window.location.reload()}
            className="group flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-primary/30 hover:bg-green-600 hover:shadow-primary/50 hover:-translate-y-1 active:translate-y-0 transition-all duration-300 text-sm"
          >
            <Icon
              icon="solar:refresh-bold-duotone"
              className="text-xl group-hover:rotate-180 transition-transform duration-700"
            />
            <span>Muat Ulang Halaman</span>
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
