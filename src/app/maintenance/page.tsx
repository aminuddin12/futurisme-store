'use client';

import Link from 'next/link';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import webConfig from '@/data/web-config.json'; // Import data config

export default function Maintenance() {
  // 1. Ekstrak Data dari Config
  const { message, errorCode, maintenanceDetail, data } = webConfig;

  // 1.a Ensure maintenanceDetail is not null to avoid runtime/TS issues
  const maintenance = (maintenanceDetail ?? { reason: '-', estimatedEndTime: '' }) as {
    reason?: string;
    estimatedEndTime?: string;
  };

  // 2. Cari data contact support dari array data
  const supportContact = data.find(item => item.key === 'support_contact')?.value as { whatsapp: string, email: string } | undefined;

  // 3. Helper untuk format tanggal
  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950 text-center px-6 overflow-hidden relative">
      
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
            animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.2, 1] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute top-[-10%] left-[-10%] w-[50vh] h-[50vh] bg-primary/5 rounded-full blur-3xl"
        />
        <motion.div 
            animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.1, 1] }}
            transition={{ duration: 7, repeat: Infinity, delay: 1 }}
            className="absolute bottom-[-10%] right-[-10%] w-[60vh] h-[60vh] bg-blue-500/5 rounded-full blur-3xl"
        />
      </div>

      {/* Animasi Icon */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-8 relative z-10"
      >
        <div className="relative w-48 h-48 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center shadow-2xl border border-gray-100 dark:border-gray-800 mx-auto">
            {/* Rocket Icon */}
            <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
                <Icon 
                    icon="solar:rocket-2-bold-duotone" 
                    className="text-[100px] text-primary drop-shadow-lg" 
                />
            </motion.div>

            {/* Tools Floating */}
            <motion.div 
                animate={{ rotate: [0, 10, 0], x: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                className="absolute -right-2 top-4 bg-white dark:bg-gray-800 p-2 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
            >
                <Icon icon="solar:settings-bold-duotone" className="text-2xl text-blue-500" />
            </motion.div>
            
            <motion.div 
                animate={{ rotate: [0, -10, 0], y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                className="absolute -left-4 bottom-8 bg-white dark:bg-gray-800 p-2 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
            >
                <Icon icon="solar:wrench-bold-duotone" className="text-2xl text-orange-500" />
            </motion.div>
        </div>
      </motion.div>

      {/* Text Content Dinamis */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="relative z-10 max-w-lg w-full"
      >
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-3 tracking-tight">
          System Maintenance
        </h1>
        
        {/* Pesan dari Config */}
        <p className="text-gray-500 dark:text-gray-400 text-base md:text-lg mb-6 leading-relaxed">
          {message}
        </p>

        {/* Detail Box */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm mb-8 text-left space-y-3">
            <div className="flex items-start gap-3">
                <Icon icon="solar:info-circle-bold-duotone" className="text-blue-500 text-xl mt-0.5 shrink-0" />
                <div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-0.5">Alasan</span>
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{maintenance.reason || '-'}</span>
                </div>
            </div>
            
            <div className="h-px bg-gray-100 dark:bg-gray-800 w-full my-2"></div>

            <div className="flex items-start gap-3">
                <Icon icon="solar:clock-circle-bold-duotone" className="text-orange-500 text-xl mt-0.5 shrink-0" />
                <div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-0.5">Estimasi Selesai</span>
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                        {formatDate(maintenance.estimatedEndTime)}
                    </span>
                </div>
            </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* Button Refresh */}
            <button 
                onClick={() => window.location.reload()}
                className="w-full sm:w-auto group flex items-center justify-center gap-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-6 py-3 rounded-full font-bold shadow-sm hover:shadow-md border border-gray-200 dark:border-gray-700 transition-all"
            >
                <Icon icon="solar:refresh-bold-duotone" className="text-xl group-hover:rotate-180 transition-transform duration-500" />
                <span>Cek Status</span>
            </button>

            {/* Button Contact Support (Dynamic Link) */}
            {supportContact?.whatsapp && (
                <Link href={supportContact.whatsapp} target="_blank" className="w-full sm:w-auto">
                    <button className="w-full sm:w-auto group flex items-center justify-center gap-2 bg-primary text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-primary/30 hover:bg-green-600 hover:shadow-xl transition-all">
                        <Icon icon="solar:chat-round-dots-bold-duotone" className="text-xl" />
                        <span>Hubungi Support</span>
                    </button>
                </Link>
            )}
        </div>

        <div className="mt-12 text-xs font-mono text-gray-400 dark:text-gray-600">
            Error Code: <span className="text-red-400 font-bold">{errorCode}</span>
        </div>
      </motion.div>

    </div>
  );
}