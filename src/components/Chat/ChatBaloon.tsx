'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import { Contact } from './types';
import ChatHeader from './ChatHeader';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import ChatSidebar from './ChatSidebar';
import ChatSetting from './ChatSetting'; // Import komponen setting baru

// --- Data Dummy Diperluas ---
const dummyContacts: Contact[] = [
  {
    id: 1,
    name: 'Admin Support',
    avatar: 'https://i.pravatar.cc/150?u=1',
    lastMessage: 'Halo, ada yang bisa kami bantu terkait pesanan kakak? Kami siap membantu 24 jam.',
    isRead: false,
    unreadCount: 2,
    status: 'online',
    messages: [
        { id: 1, sender: 'other', text: 'Halo kak, selamat siang!', time: '10:00' },
        { id: 2, sender: 'me', text: 'Siang min, mau tanya stok ISKU ready?', time: '10:05' },
        { id: 3, sender: 'other', text: 'Stok ISKU Tool Kit Set 82pcs masih tersedia banyak kak. Silahkan diorder sebelum kehabisan ya karena sedang flash sale!', time: '10:10' },
        { id: 4, sender: 'other', text: 'Halo, ada yang bisa kami bantu terkait pesanan kakak? Kami siap membantu 24 jam.', time: '10:12' },
    ]
  },
  {
    id: 2,
    name: 'Kurir Express',
    avatar: 'https://i.pravatar.cc/150?u=3',
    lastMessage: 'Paket sudah dikirim ya.',
    isRead: true,
    unreadCount: 0,
    status: 'offline',
    messages: [
        { id: 1, sender: 'me', text: 'Paket saya dikirim kapan ya?', time: '08:00' },
        { id: 2, sender: 'other', text: 'Paket sudah dikirim ya. Resi akan terupdate otomatis malam ini.', time: '09:30' },
    ]
  },
  {
    id: 3,
    name: 'Toko Sebelah',
    avatar: 'https://i.pravatar.cc/150?u=8',
    lastMessage: 'Silahkan mampir kak, lagi ada promo besar-besaran lho!',
    isRead: false,
    unreadCount: 5,
    status: 'online',
    messages: [
         { id: 1, sender: 'other', text: 'Silahkan mampir kak, lagi ada promo besar-besaran lho!', time: '12:00' },
    ]
  },
  {
    id: 4,
    name: 'Budi Santoso (Teknisi)',
    avatar: 'https://i.pravatar.cc/150?u=12',
    lastMessage: 'Untuk pemasangan bor impact bisa dilihat di manual halaman 12 ya mas.',
    isRead: true,
    unreadCount: 0,
    status: 'online',
    messages: [
        { id: 1, sender: 'me', text: 'Mas, ini cara pasang mata bornya gimana ya? Agak keras putarannya.', time: 'Kemarin' },
        { id: 2, sender: 'other', text: 'Coba diputar berlawanan arah jarum jam dulu chuck-nya mas sampai terbuka maksimal.', time: 'Kemarin' },
        { id: 3, sender: 'me', text: 'Oke sudah bisa, makasih.', time: 'Kemarin' },
        { id: 4, sender: 'other', text: 'Untuk pemasangan bor impact bisa dilihat di manual halaman 12 ya mas.', time: '08:15' },
    ]
  },
  {
    id: 5,
    name: 'Siti - Customer Service',
    avatar: 'https://i.pravatar.cc/150?u=25',
    lastMessage: 'Mohon ditunggu sebentar ya kak, saya cek dulu status pembayarannya.',
    isRead: false,
    unreadCount: 1,
    status: 'online',
    messages: [
        { id: 1, sender: 'me', text: 'Halo kak, saya sudah transfer tapi status masih pending.', time: '13:00' },
        { id: 2, sender: 'other', text: 'Halo kak, boleh kirimkan bukti transfernya?', time: '13:02' },
        { id: 3, sender: 'me', text: '[Mengirim Bukti Transfer.jpg]', time: '13:05' },
        { id: 4, sender: 'other', text: 'Mohon ditunggu sebentar ya kak, saya cek dulu status pembayarannya.', time: '13:06' },
    ]
  },
  {
    id: 6,
    name: 'Komunitas Gadget',
    avatar: 'https://i.pravatar.cc/150?u=33',
    lastMessage: 'Rekomendasi HP 3 jutaan terbaik bulan ini apa ya gan?',
    isRead: false,
    unreadCount: 12,
    status: 'offline',
    messages: [
        { id: 1, sender: 'other', text: 'Wah setuju sih, kameranya juara.', time: '10:00' },
        { id: 2, sender: 'other', text: 'Tapi baterainya agak boros.', time: '10:02' },
        { id: 3, sender: 'other', text: 'Rekomendasi HP 3 jutaan terbaik bulan ini apa ya gan?', time: '14:20' },
    ]
  },
  {
    id: 7,
    name: 'Dina (Sales)',
    avatar: 'https://i.pravatar.cc/150?u=41',
    lastMessage: 'Stok warna hitam tinggal 2 unit kak.',
    isRead: true,
    unreadCount: 0,
    status: 'online',
    messages: [
        { id: 1, sender: 'other', text: 'Selamat pagi kak, tertarik dengan promo laptop gamingnya?', time: '09:00' },
        { id: 2, sender: 'me', text: 'Yang seri ROG ada warna apa aja?', time: '09:15' },
        { id: 3, sender: 'other', text: 'Ada hitam dan silver kak.', time: '09:16' },
        { id: 4, sender: 'other', text: 'Stok warna hitam tinggal 2 unit kak.', time: '09:20' },
    ]
  },
  {
    id: 8,
    name: 'Service Center Resmi',
    avatar: 'https://i.pravatar.cc/150?u=55',
    lastMessage: 'Unit sudah selesai diperbaiki dan bisa diambil di gerai.',
    isRead: true,
    unreadCount: 0,
    status: 'offline',
    messages: [
        { id: 1, sender: 'other', text: 'Selamat siang, menginformasikan bahwa unit servis no #INV-2938 sudah kami terima.', time: 'Senin' },
        { id: 2, sender: 'other', text: 'Unit sedang dalam pengerjaan teknisi.', time: 'Selasa' },
        { id: 3, sender: 'other', text: 'Unit sudah selesai diperbaiki dan bisa diambil di gerai.', time: '11:30' },
    ]
  },
  {
    id: 9,
    name: 'Spam Promo',
    avatar: 'https://i.pravatar.cc/150?u=99',
    lastMessage: 'Selamat! Anda terpilih mendapatkan voucher belanja 1 juta rupiah. Klik link berikut...',
    isRead: false,
    unreadCount: 1,
    status: 'offline',
    messages: [
        { id: 1, sender: 'other', text: 'Selamat! Anda terpilih mendapatkan voucher belanja 1 juta rupiah. Klik link berikut untuk klaim: http://fake-link.com', time: '02:00' },
    ]
  }
];

export default function ChatBaloon() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false); // State untuk Settings
  const [activeContactId, setActiveContactId] = useState<number>(dummyContacts[0].id);
  
  const [isMobileChatActive, setIsMobileChatActive] = useState(false);
  
  const activeContact = dummyContacts.find(c => c.id === activeContactId) || dummyContacts[0];

  const handleContactSelect = (id: number) => {
    setActiveContactId(id);
    setIsMobileChatActive(true); 
  };

  const handleBackToSidebar = () => {
    setIsMobileChatActive(false);
  };

  const handleSendMessage = (text: string) => {
    console.log("Mengirim pesan:", text);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* --- Backdrop Blur (Overlay) --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[100] bg-black/20 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* --- Floating Button (Muncul saat Chat tertutup) --- */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-[110] flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-full shadow-lg shadow-primary/30 hover:bg-green-600 transition-colors"
          >
            <Icon icon="fluent:chat-bubbles-question-24-filled" className="text-2xl" />
            <span className="font-bold">Chat</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* --- Chat Panel (Modal) --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-6 right-6 z-[110] w-[90vw] md:w-[940px] h-[80vh] md:h-[625px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 flex flex-col overflow-hidden"
          >
            {/* --- Header Utama --- */}
            <div className="h-[56px] bg-primary text-white flex items-center justify-between px-4 shrink-0 z-20 shadow-sm">
                <div className="flex items-center gap-2 font-bold text-lg">
                    <Icon icon="fluent:chat-bubbles-24-filled" className="text-xl" />
                    <span>Text Messaging</span>
                </div>
                
                <div className="flex items-center gap-3">
                    {/* Tombol Setting (Toggle) */}
                    <button 
                        onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                        className={`bg-white text-primary px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm hover:bg-gray-50 transition-colors ${isSettingsOpen ? 'ring-2 ring-offset-1 ring-white/50' : ''}`}
                    >
                        <Icon icon="fluent:settings-24-filled" className="text-base" />
                        <span className="hidden sm:inline">Pengaturan Chat</span>
                    </button>

                    {/* Tombol Close */}
                    <button 
                        onClick={() => setIsOpen(false)}
                        className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
                    >
                        <Icon icon="fluent:dismiss-24-filled" className="text-xl" />
                    </button>
                </div>
            </div>

            {/* --- Content Container (Sidebar + Main Panel + Setting Overlay) --- */}
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
                
                {/* === Settings Overlay (Muncul menutupi konten) === */}
                <AnimatePresence>
                    {isSettingsOpen && (
                        <ChatSetting onClose={() => setIsSettingsOpen(false)} />
                    )}
                </AnimatePresence>

                {/* === SIDEBAR (Kiri) === */}
                <ChatSidebar 
                    contacts={dummyContacts}
                    activeContactId={activeContactId}
                    onSelectContact={handleContactSelect}
                    isMobileChatActive={isMobileChatActive}
                />

                {/* === MAIN PANEL (Kanan) === */}
                <div className={`w-full md:w-[65%] flex-col bg-white dark:bg-gray-950 relative h-full ${isMobileChatActive ? 'flex' : 'hidden md:flex'}`}>
                  
                  <ChatHeader 
                    contact={activeContact} 
                    onBack={handleBackToSidebar}
                  />

                  <ChatBody messages={activeContact.messages} />

                  <ChatFooter onSendMessage={handleSendMessage} />

                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}