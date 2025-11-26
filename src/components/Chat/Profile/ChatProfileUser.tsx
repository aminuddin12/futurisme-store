'use client';

import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { Contact } from '../types';

interface ChatProfileUserProps {
  contact: Contact;
  onBack: () => void;
}

export default function ChatProfileUser({ contact, onBack }: ChatProfileUserProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col h-full bg-gray-100 dark:bg-gray-950 overflow-hidden"
    >
      {/* --- Header Profile --- */}
      <div className="h-[60px] px-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center gap-3 shrink-0 sticky top-0 z-10">
        <button 
          onClick={onBack}
          className="w-8 h-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 transition-colors"
        >
          <Icon icon="fluent:arrow-left-24-regular" className="text-xl" />
        </button>
        <h3 className="font-bold text-gray-800 dark:text-gray-100 text-lg">Info Kontak</h3>
      </div>

      {/* --- Content (Scrollable) --- */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        
        {/* 1. Hero Section (Foto & Nama) */}
        <div className="bg-white dark:bg-gray-900 pb-6 mb-2 shadow-sm flex flex-col items-center pt-8">
          <div className="relative w-32 h-32 mb-4 group cursor-pointer">
            <img 
              src={contact.avatar} 
              alt={contact.name} 
              className="w-full h-full rounded-full object-cover shadow-md group-hover:opacity-90 transition-opacity"
            />
            {/* Overlay Hover Camera Icon */}
            <div className="absolute inset-0 bg-black/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
               <Icon icon="fluent:camera-24-filled" className="text-white text-3xl" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-1 text-center px-4">
            {contact.name}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
            +62 812-3456-7890
          </p>
          
          {/* Quick Actions */}
          <div className="flex gap-6 mt-6">
            <div className="flex flex-col items-center gap-1 cursor-pointer group">
              <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-primary group-hover:bg-green-50 transition-colors">
                <Icon icon="fluent:call-24-filled" className="text-xl" />
              </div>
              <span className="text-xs text-primary font-medium">Panggil</span>
            </div>
            <div className="flex flex-col items-center gap-1 cursor-pointer group">
              <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-primary group-hover:bg-green-50 transition-colors">
                <Icon icon="fluent:video-24-filled" className="text-xl" />
              </div>
              <span className="text-xs text-primary font-medium">Video</span>
            </div>
            <div className="flex flex-col items-center gap-1 cursor-pointer group">
              <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors">
                <Icon icon="fluent:search-24-regular" className="text-xl" />
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Cari</span>
            </div>
          </div>
        </div>

        {/* 2. Info / About */}
        <div className="bg-white dark:bg-gray-900 px-4 py-4 mb-2 shadow-sm">
          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Info</h4>
          <p className="text-gray-800 dark:text-gray-200 text-base leading-relaxed">
            {/* Dummy status like WhatsApp */}
            Available, urgent calls only.
          </p>
          <span className="text-xs text-gray-400 mt-1 block">2 jam yang lalu</span>
        </div>

        {/* 3. Media, Links, Docs */}
        <div className="bg-white dark:bg-gray-900 px-4 py-4 mb-2 shadow-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Media, Tautan, dan Dokumen</h4>
            <div className="flex items-center text-gray-400 text-xs gap-1">
              120 <Icon icon="fluent:chevron-right-20-regular" />
            </div>
          </div>
          
          {/* Dummy Media Thumbnails */}
          <div className="flex gap-2 overflow-hidden">
            {[1,2,3,4].map((i) => (
              <div key={i} className="w-20 h-20 rounded-lg bg-gray-200 dark:bg-gray-800 shrink-0 overflow-hidden relative">
                 <img src={`https://picsum.photos/200?random=${i}`} alt="Media" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* 4. Settings Options */}
        <div className="bg-white dark:bg-gray-900 mb-2 shadow-sm">
          <button className="w-full px-4 py-4 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors text-left">
            <Icon icon="fluent:star-24-regular" className="text-gray-500 text-xl" />
            <div className="flex-1 text-sm font-medium text-gray-800 dark:text-gray-200">Pesan Berbintang</div>
            <Icon icon="fluent:chevron-right-20-regular" className="text-gray-400" />
          </button>
          <div className="h-px bg-gray-100 dark:bg-gray-800 mx-4"></div>
          <button className="w-full px-4 py-4 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors text-left">
            <Icon icon="fluent:alert-24-regular" className="text-gray-500 text-xl" />
            <div className="flex-1 text-sm font-medium text-gray-800 dark:text-gray-200">Bisukan Notifikasi</div>
            <div className="w-10 h-5 bg-gray-200 dark:bg-gray-700 rounded-full relative">
               <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5 shadow"></div>
            </div>
          </button>
        </div>

        {/* 5. Danger Actions */}
        <div className="bg-white dark:bg-gray-900 mb-8 shadow-sm">
          <button className="w-full px-4 py-4 flex items-center gap-4 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left text-red-600 dark:text-red-400">
            <Icon icon="fluent:prohibited-24-regular" className="text-xl" />
            <span className="text-sm font-bold">Blokir {contact.name}</span>
          </button>
          <div className="h-px bg-gray-100 dark:bg-gray-800 mx-4"></div>
          <button className="w-full px-4 py-4 flex items-center gap-4 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left text-red-600 dark:text-red-400">
            <Icon icon="fluent:thumb-dislike-24-regular" className="text-xl" />
            <span className="text-sm font-bold">Laporkan Kontak</span>
          </button>
        </div>

      </div>
    </motion.div>
  );
}