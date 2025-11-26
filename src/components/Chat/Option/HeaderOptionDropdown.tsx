'use client';

import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useEffect, useRef } from 'react';

interface HeaderOptionDropdownProps {
  onClose: () => void;
  onSelect: (action: string) => void;
}

// Definisi menu
const menuItems = [
  { id: 'contact_info', label: 'Info Kontak', icon: 'fluent:contact-card-24-regular' },
  { id: 'select_messages', label: 'Pilih Pesan', icon: 'fluent:checkbox-checked-24-regular' },
  { id: 'mute_notifications', label: 'Bisukan Notifikasi', icon: 'fluent:speaker-mute-24-regular' },
  { id: 'clear_chat', label: 'Bersihkan Chat', icon: 'fluent:delete-24-regular', danger: true },
];

export default function HeaderOptionDropdown({ onClose, onSelect }: HeaderOptionDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Tutup dropdown jika klik di luar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <motion.div
      ref={dropdownRef}
      initial={{ opacity: 0, scale: 0.95, y: -10, x: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -10 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="absolute top-[55px] right-2 z-30 w-56 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden py-1.5 origin-top-right"
    >
      {menuItems.map((item) => (
        <button
          key={item.id}
          onClick={() => { onSelect(item.id); onClose(); }}
          className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors text-left group
            ${item.danger 
                ? 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20' 
                : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800'
            }
          `}
        >
          <Icon 
            icon={item.icon} 
            className={`text-lg ${item.danger ? 'text-red-500' : 'text-gray-500 dark:text-gray-400 group-hover:text-primary'}`} 
          />
          <span className="font-medium">{item.label}</span>
        </button>
      ))}
    </motion.div>
  );
}