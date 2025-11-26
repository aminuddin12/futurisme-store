'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

interface ChatSettingProps {
  onClose: () => void;
}

// Data Menu Pengaturan (12 Item)
const settingsMenu = [
  { id: 1, label: 'Notifikasi Suara', icon: 'fluent:speaker-2-24-regular', defaultChecked: true },
  { id: 2, label: 'Tampilkan Pratinjau Pesan', icon: 'fluent:eye-show-24-regular', defaultChecked: true },
  { id: 3, label: 'Status Online', icon: 'fluent:presence-available-24-regular', defaultChecked: true },
  { id: 4, label: 'Tema Gelap Otomatis', icon: 'fluent:dark-theme-24-regular', defaultChecked: false },
  { id: 5, label: 'Simpan Riwayat Chat', icon: 'fluent:history-24-regular', defaultChecked: true },
  { id: 6, label: 'Blokir Pesan Spam', icon: 'fluent:shield-error-24-regular', defaultChecked: true },
  { id: 7, label: 'Unduh Media Otomatis', icon: 'fluent:arrow-download-24-regular', defaultChecked: false },
  { id: 8, label: 'Kirim dengan Enter', icon: 'fluent:keyboard-enter-24-regular', defaultChecked: true },
  { id: 9, label: 'Terjemahan Otomatis', icon: 'fluent:translate-24-regular', defaultChecked: false },
  { id: 10, label: 'Mode Hemat Data', icon: 'fluent:data-usage-24-regular', defaultChecked: false },
  { id: 11, label: 'Arsipkan Chat Lama', icon: 'fluent:archive-24-regular', defaultChecked: true },
  { id: 12, label: 'Izinkan Lokasi', icon: 'fluent:location-24-regular', defaultChecked: false },
];

export default function ChatSetting({ onClose }: ChatSettingProps) {
  // State lokal untuk toggle switch
  const [settings, setSettings] = useState(
    settingsMenu.reduce((acc, item) => ({ ...acc, [item.id]: item.defaultChecked }), {} as Record<number, boolean>)
  );

  const toggleSetting = (id: number) => {
    setSettings(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Animasi Panel Turun dari Atas
  const containerVariants = {
    hidden: { y: "-100%", opacity: 0 },
    visible: { 
      y: "0%", 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    },
    exit: { y: "-100%", opacity: 0 }
  };

  // Animasi List Menu (Stagger)
  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="absolute inset-0 z-30 bg-white dark:bg-gray-900 flex flex-col"
    >
      {/* Header Setting (Internal) */}
      <div className="h-[60px] flex items-center justify-between px-4 border-b border-gray-100 dark:border-gray-800 shrink-0 bg-gray-50/50 dark:bg-gray-900">
        <h3 className="font-bold text-gray-800 dark:text-gray-200 text-lg flex items-center gap-2">
          <Icon icon="fluent:settings-24-regular" className="text-primary" />
          Pengaturan
        </h3>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-800 p-2 rounded-full transition-colors flex items-center gap-1 text-xs font-medium"
        >
          Tutup <Icon icon="fluent:chevron-up-24-regular" className="text-lg" />
        </button>
      </div>

      {/* List Menu */}
      <div className="flex-1 overflow-y-auto p-4 scrollbar-hide">
        <motion.div 
          variants={listVariants}
          initial="hidden"
          animate="visible"
          className="space-y-1"
        >
          {settingsMenu.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group cursor-pointer"
              onClick={() => toggleSetting(item.id)}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 group-hover:text-primary group-hover:bg-green-50 dark:group-hover:bg-green-900/20 transition-colors">
                  <Icon icon={item.icon} className="text-lg" />
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                  {item.label}
                </span>
              </div>

              {/* Custom Switcher */}
              <div className={`w-11 h-6 rounded-full relative transition-colors duration-300 ${settings[item.id] ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'}`}>
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-300 ${settings[item.id] ? 'left-6' : 'left-1'}`}></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}