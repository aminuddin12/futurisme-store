'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Contact } from './types';

interface ChatSidebarProps {
  contacts: Contact[];
  activeContactId: number;
  onSelectContact: (id: number) => void;
  isMobileChatActive: boolean;
}

// Helper text truncate
const truncateText = (text: string, limit: number = 35) => {
  return text.length > limit ? text.substring(0, limit) + '...' : text;
};

// Tipe Filter
type FilterType = 'Semua' | 'Belum Dibaca' | 'Sudah Dibaca' | 'Spam';

export default function ChatSidebar({
  contacts,
  activeContactId,
  onSelectContact,
  isMobileChatActive
}: ChatSidebarProps) {
  
  const [activeFilter, setActiveFilter] = useState<FilterType>('Semua');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  // Logika Filtering
  const filteredContacts = contacts.filter(contact => {
    if (activeFilter === 'Semua') return true;
    if (activeFilter === 'Belum Dibaca') return !contact.isRead;
    if (activeFilter === 'Sudah Dibaca') return contact.isRead;
    if (activeFilter === 'Spam') return contact.name.toLowerCase().includes('spam');
    return true;
  });

  // Fungsi untuk menghitung jumlah item per filter
  const getFilterCount = (filter: FilterType) => {
    if (filter === 'Semua') return contacts.length;
    if (filter === 'Belum Dibaca') return contacts.filter(c => !c.isRead).length;
    if (filter === 'Sudah Dibaca') return contacts.filter(c => c.isRead).length;
    if (filter === 'Spam') return contacts.filter(c => c.name.toLowerCase().includes('spam')).length;
    return 0;
  };

  const filters: FilterType[] = ['Semua', 'Belum Dibaca', 'Sudah Dibaca', 'Spam'];

  return (
    <div className={`w-full border-r border-gray-100 dark:border-gray-800 flex flex-col bg-white dark:bg-gray-900 h-full ${isMobileChatActive ? 'hidden md:flex' : 'flex'}`}>
      
      {/* Sidebar Header dengan Filter */}
      <div className="px-4 pt-4 pb-2 shrink-0 border-b border-gray-50 dark:border-gray-800 flex flex-col gap-3 relative">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-bold text-gray-800 dark:text-gray-100 text-lg">Pesan</h3>
          {/* Kode penghitung chat lama dihapus di sini */}
        </div>

        {/* Wrapper Filter Tabs dengan Gradasi Indikator Scroll */}
        <div className="relative w-full">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 px-1 relative z-10">
            {filters.map((filter) => {
              const isActive = activeFilter === filter;
              const count = getFilterCount(filter);

              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 border shrink-0
                    ${isActive 
                      ? 'bg-primary text-white border-primary shadow-sm shadow-green-100 dark:shadow-none' 
                      : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                >
                  <span>{filter}</span>
                  
                  {/* Badge Penghitungan Baru */}
                  {count > 0 && (
                    <span className={`flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold leading-none transition-colors
                      ${isActive 
                        ? 'bg-white text-primary' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
            {/* Spacer kecil di akhir list agar item terakhir tidak mepet gradasi */}
            <div className="w-4 shrink-0 h-1"></div>
          </div>

          {/* Gradasi Kanan (Indikator Scroll) */}
          <div className="absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-white via-white/80 to-transparent dark:from-gray-900 dark:via-gray-900/80 pointer-events-none z-20"></div>
        </div>
      </div>

      {/* List Kontak */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-3 pt-3 pb-28">
        {filteredContacts.length > 0 ? (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-1"
            key={activeFilter} 
          >
            {filteredContacts.map((contact) => {
              const isActive = activeContactId === contact.id;
              
              return (
                <motion.button
                  key={contact.id}
                  variants={itemVariants}
                  onClick={() => onSelectContact(contact.id)}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-left group relative
                      ${isActive 
                          ? 'bg-green-50 dark:bg-green-900/20' 
                          : 'hover:bg-gray-50 dark:hover:bg-gray-800/50 bg-transparent'
                      }`}
                >
                  {/* Indicator Active */}
                  {isActive && (
                      <motion.div 
                          layoutId="activeIndicator"
                          className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-primary rounded-r-full"
                      />
                  )}

                  {/* Foto Profil */}
                  <div className="relative shrink-0">
                      <img 
                          src={contact.avatar} 
                          alt={contact.name} 
                          className="w-12 h-12 rounded-full object-cover bg-gray-200 ring-1 ring-gray-100 dark:ring-gray-700 group-hover:ring-gray-200 dark:group-hover:ring-gray-600 transition-all" 
                      />
                      {contact.status === 'online' && (
                          <span className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></span>
                      )}
                  </div>

                  {/* Info Kontak */}
                  <div className="flex-1 min-w-0 flex flex-col justify-center gap-0.5">
                      <div className="flex justify-between items-baseline">
                          <span className={`text-sm font-semibold truncate max-w-[70%] ${isActive ? 'text-primary' : 'text-gray-800 dark:text-gray-100'}`}>
                              {contact.name}
                          </span>
                          <span className={`text-[10px] font-medium ${isActive ? 'text-primary/80' : 'text-gray-400'}`}>
                              {contact.messages.length > 0 ? contact.messages[contact.messages.length - 1].time : ''}
                          </span>
                      </div>

                      <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1 min-w-0 flex-1">
                              {contact.isRead && (
                                  <Icon 
                                      icon="fluent:checkmark-20-filled" 
                                      className={`text-xs shrink-0 ${isActive ? 'text-primary/70' : 'text-green-600'}`} 
                                  />
                              )}
                              
                              <p className={`text-xs truncate ${(!contact.isRead && contact.unreadCount > 0) ? 'font-semibold text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                                  {truncateText(contact.lastMessage)}
                              </p>
                          </div>

                          {!contact.isRead && contact.unreadCount > 0 && (
                              <motion.span 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="shrink-0 bg-red-500 text-white text-[10px] font-bold h-5 min-w-[20px] px-1.5 rounded-full flex items-center justify-center shadow-sm shadow-red-200 dark:shadow-none"
                              >
                                  {contact.unreadCount}
                              </motion.span>
                          )}
                      </div>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-gray-400 dark:text-gray-500 gap-2 animate-pulse">
            <Icon icon="fluent:chat-dismiss-24-regular" className="text-4xl opacity-50" />
            <p className="text-xs text-center">Tidak ada pesan di filter ini</p>
          </div>
        )}
      </div>
    </div>
  );
}