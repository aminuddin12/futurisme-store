'use client';

import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { Contact } from './types';

interface ChatSidebarProps {
  contacts: Contact[];
  activeContactId: number;
  onSelectContact: (id: number) => void;
  isMobileChatActive: boolean;
}

const truncateText = (text: string) => {
  return text.length > 30 ? text.substring(0, 30) + '...' : text;
};

export default function ChatSidebar({
  contacts,
  activeContactId,
  onSelectContact,
  isMobileChatActive
}: ChatSidebarProps) {
  
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

  return (
    <div className={`w-full md:w-[35%] border-r border-gray-100 dark:border-gray-800 flex flex-col bg-gray-50/50 dark:bg-gray-900 h-full ${isMobileChatActive ? 'hidden md:flex' : 'flex'}`}>

      {/* List Kontak */}
      <div className="flex-1 overflow-y-auto scrollbar-hide p-2">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-1"
        >
          {contacts.map((contact) => (
            <motion.button
              key={contact.id}
              variants={itemVariants}
              onClick={() => onSelectContact(contact.id)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full grid grid-cols-[20%_80%] gap-3 p-3 rounded-xl transition-all duration-200 text-left group relative overflow-hidden
                  ${activeContactId === contact.id 
                      ? 'bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700' 
                      : 'hover:bg-white dark:hover:bg-gray-800/50 border border-transparent'
                  }`}
            >
              <div className="relative flex items-center justify-center">
                  <img 
                      src={contact.avatar} 
                      alt={contact.name} 
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover bg-gray-200 ring-2 ring-transparent group-hover:ring-primary/20 transition-all" 
                  />
                  {contact.status === 'online' && (
                      <span className="absolute bottom-0 right-0 md:right-1 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></span>
                  )}
              </div>

              <div className="flex flex-col justify-center min-w-0">
                  <div className="flex justify-between items-start mb-0.5">
                      <span className={`font-bold text-sm truncate ${activeContactId === contact.id ? 'text-primary' : 'text-gray-800 dark:text-gray-200'}`}>
                          {contact.name}
                      </span>
                      <span className="text-[10px] text-gray-400">
                          {contact.messages.length > 0 ? contact.messages[contact.messages.length - 1].time : ''}
                      </span>
                  </div>

                  <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-1.5 flex-1 min-w-0">
                          <Icon 
                              icon="fluent:checkmark-20-filled" 
                              className={`text-sm shrink-0 ${contact.isRead ? 'text-primary' : 'text-gray-400'}`} 
                          />
                          <p className={`text-xs truncate ${!contact.isRead && contact.unreadCount > 0 ? 'font-bold text-gray-800 dark:text-gray-200' : 'text-gray-500 dark:text-gray-400'}`}>
                              {truncateText(contact.lastMessage)}
                          </p>
                      </div>

                      {!contact.isRead && contact.unreadCount > 0 && (
                          <motion.span 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="shrink-0 bg-red-500 text-white text-[10px] font-bold h-4 min-w-[16px] px-1 rounded-full flex items-center justify-center ml-2 shadow-sm shadow-red-200 dark:shadow-none"
                          >
                              {contact.unreadCount}
                          </motion.span>
                      )}
                  </div>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </div>
  );
}