'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Contact } from './types';
import ChatHeader from './ChatHeader';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import ChatSidebar from './ChatSidebar';
import ChatSetting from './ChatSetting';
import ChatProfileUser from './Profile/ChatProfileUser';
import ChatSidebarEmpty from './ChatSidebarEmpty';
import ChatMainPanelEmpty from './ChatMainPanelEmpty';
import ChatMobileHeader from './ChatMobileHeader';
import ChatMobileMain from './ChatMobileMain';
import ChatPageSidebar from './ChatPageSidebar';

import chatDataDummy from './Dummy/chatData.json';

export default function ChatPage() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeContactId, setActiveContactId] = useState<number | null>(null);
  const [isMobileChatActive, setIsMobileChatActive] = useState(false);
  const [contacts, setContacts] = useState<Contact[] | null>(null);
  const [activeTab, setActiveTab] = useState('chat');

  useEffect(() => {
    const loadContacts = () => {
      setContacts(chatDataDummy as unknown as Contact[]);
    };
    loadContacts();
  }, []);

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

  return (
    // UPDATE: Tinggi dan style disesuaikan untuk Mobile (Full height, no border) vs Desktop (Card style)
    <div className="flex flex-col h-[calc(100vh-90px)] md:h-[calc(100vh-180px)] overflow-hidden bg-white dark:bg-gray-900 md:rounded-2xl md:shadow-sm md:border border-gray-100 dark:border-gray-800 relative">
      
      <AnimatePresence>
          {isSettingsOpen && (
              <ChatSetting onClose={() => setIsSettingsOpen(false)} />
          )}
      </AnimatePresence>

      {/* Tampilan Mobile Awal */}
      {!isMobileChatActive && (
        <>
          <ChatMobileHeader onSettingsClick={() => setIsSettingsOpen(true)} />
          
          {currentContacts.length > 0 ? (
             <div className="md:hidden flex-1 overflow-hidden relative">
                <ChatSidebar 
                  contacts={currentContacts}
                  activeContactId={activeContactId || 0}
                  onSelectContact={handleContactSelect}
                  isMobileChatActive={false} 
                />
                
                {/* UPDATE: Gradasi Bawah untuk Mobile */}
                {/* Memberikan efek visual bahwa list berlanjut ke bawah & memisahkan dari Bottom Navbar */}
                <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white via-white/90 to-transparent dark:from-gray-900 dark:via-gray-900/90 pointer-events-none z-10"></div>
             </div>
          ) : (
             <ChatMobileMain />
          )}
        </>
      )}

      {/* Tampilan Desktop & Mobile Chat Room */}
      <div className={`flex-1 flex flex-col md:flex-row overflow-hidden relative ${!isMobileChatActive ? 'hidden md:flex' : 'flex'}`}>
        
        <ChatPageSidebar 
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onSettingsClick={() => setIsSettingsOpen(true)}
        />

        <div className={`hidden md:flex w-full md:w-[320px] xl:w-[25%] border-r border-gray-100 dark:border-gray-800 flex-col bg-white dark:bg-gray-900 h-full`}>
            {currentContacts.length > 0 ? (
                <ChatSidebar 
                    contacts={currentContacts}
                    activeContactId={activeContactId || 0}
                    onSelectContact={handleContactSelect}
                    isMobileChatActive={false}
                />
            ) : (
                <ChatSidebarEmpty />
            )}
        </div>

        <div className="flex-1 flex-col bg-white dark:bg-gray-950 relative h-full flex min-w-0">
          {currentContacts.length > 0 && activeContact ? (
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
          ) : (
             <div className="hidden md:flex w-full h-full relative">
                <ChatMainPanelEmpty />
             </div>
          )}
        </div>
      </div>
    </div>
  );
}