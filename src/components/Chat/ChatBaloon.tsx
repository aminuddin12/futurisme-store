'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import { Contact } from './types';
import ChatHeader from './ChatHeader';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import ChatSidebar from './ChatSidebar';
import ChatSetting from './ChatSetting';
import ChatProfileUser from './Profile/ChatProfileUser';
import ChatSidebarEmpty from './ChatSidebarEmpty';
import ChatMainPanelEmpty from './ChatMainPanelEmpty';

// Import data dummy dari JSON
import chatDataDummy from './Dummy/chatData.json';

export default function ChatBaloon() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false); 
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeContactId, setActiveContactId] = useState<number | null>(null);
  const [isMobileChatActive, setIsMobileChatActive] = useState(false);

  // State untuk menyimpan data kontak
  const [contacts, setContacts] = useState<Contact[] | null>(null);

  // --- FUNGSI LOAD DATA DUMMY ---
  useEffect(() => {
    // Simulasi fetching data
    const loadContacts = () => {
      // =====================================================================
      // KOMENTARI BARIS 'setContacts' DI BAWAH INI UNTUK MELIHAT TAMPILAN EMPTY / KOSONG
      // =====================================================================
      
      setContacts(chatDataDummy as unknown as Contact[]);
      
      // Jika data berhasil dimuat, set kontak pertama sebagai aktif (opsional)
      // if (chatDataDummy && chatDataDummy.length > 0) {
      //   setActiveContactId(chatDataDummy[0].id);
      // }
    };

    loadContacts();
  }, []);

  // Safe access
  const currentContacts = contacts || [];
  const activeContact = currentContacts.find(c => c.id === activeContactId) || null;

  const handleContactSelect = (id: number) => {
    setActiveContactId(id);
    setIsMobileChatActive(true);
    setIsProfileOpen(false); 
  };

  const handleBackToSidebar = () => {
    if (isProfileOpen) {
      setIsProfileOpen(false);
    } else {
      setIsMobileChatActive(false);
    }
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
            className="fixed inset-0 z-100 bg-black/20 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* --- Floating Button --- */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-110 flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-full shadow-lg shadow-primary/30 hover:bg-green-600 transition-colors"
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
            className="fixed bottom-6 right-6 z-110 w-[90vw] md:w-[940px] h-[80vh] md:h-[625px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 flex flex-col overflow-hidden"
          >
            {/* --- Header Utama --- */}
            <div className="h-14 bg-primary text-white flex items-center justify-between px-4 shrink-0 z-20 shadow-sm">
                <div className="flex items-center gap-2 font-bold text-lg">
                    <Icon icon="fluent:chat-bubbles-24-filled" className="text-xl" />
                    <span>Text Messaging</span>
                </div>
                
                <div className="flex items-center gap-3">
                    {/* Tombol Setting */}
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

            {/* --- Content Container --- */}
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
                
                {/* === Settings Overlay === */}
                <AnimatePresence>
                    {isSettingsOpen && (
                        <ChatSetting onClose={() => setIsSettingsOpen(false)} />
                    )}
                </AnimatePresence>

                {/* === SIDEBAR (Kiri) === */}
                {currentContacts.length > 0 ? (
                    <ChatSidebar 
                        contacts={currentContacts}
                        activeContactId={activeContactId || 0}
                        onSelectContact={handleContactSelect}
                        isMobileChatActive={isMobileChatActive}
                    />
                ) : (
                    <ChatSidebarEmpty />
                )}

                {/* === MAIN PANEL (Kanan) === */}
                {currentContacts.length > 0 && activeContact ? (
                    <div className={`w-full md:w-[65%] flex-col bg-white dark:bg-gray-950 relative h-full ${isMobileChatActive ? 'flex' : 'hidden md:flex'}`}>
                      <AnimatePresence mode='wait'>
                        {isProfileOpen ? (
                          <ChatProfileUser 
                            key="profile"
                            contact={activeContact}
                            onBack={() => setIsProfileOpen(false)}
                          />
                        ) : (
                          <motion.div 
                            key="chat"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col h-full w-full relative"
                          >
                            <ChatHeader 
                              contact={activeContact} 
                              onBack={handleBackToSidebar}
                              onProfileClick={() => setIsProfileOpen(true)}
                            />

                            <ChatBody messages={activeContact.messages} />

                            <ChatFooter onSendMessage={handleSendMessage} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                ) : (
                    // Jika tidak ada kontak atau tidak ada yang aktif, tampilkan Empty State di kanan
                    <div className={`w-full md:w-[65%] relative h-full hidden md:flex`}>
                        <ChatMainPanelEmpty />
                    </div>
                )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}