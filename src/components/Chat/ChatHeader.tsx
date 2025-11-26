import { useState } from 'react';
import { Icon } from '@iconify/react';
import { AnimatePresence } from 'framer-motion';
import { Contact } from './types';
import SearchDialog from './Search/SearchDialog';
import HeaderOptionDropdown from './Option/HeaderOptionDropdown';

interface ChatHeaderProps {
  contact: Contact;
  onBack: () => void;
  onProfileClick: () => void;
}

export default function ChatHeader({ contact, onBack, onProfileClick }: ChatHeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isOptionOpen, setIsOptionOpen] = useState(false);

  const handleSearch = (query: string) => {
    // Simulasi search logic, bisa diteruskan ke parent via prop jika perlu
    console.log("Mencari:", query);
  };

  const handleOptionSelect = (action: string) => {
    console.log("Menu dipilih:", action);
    if (action === 'contact_info') {
        onProfileClick();
    }
    // Aksi lain bisa ditambahkan di sini
  };

  return (
    // Wrapper relative untuk positioning dropdown/dialog
    <div className="relative w-full z-10"> 
      
      {/* Main Header Bar */}
      <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm h-[60px]">
        <div className="flex items-center gap-3">
          {/* Tombol Back (Hanya Mobile) */}
          <button 
            onClick={onBack}
            className="md:hidden w-8 h-8 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 transition-colors"
          >
            <Icon icon="fluent:arrow-left-24-regular" className="text-xl" />
          </button>

          {/* Area Profil - Clickable */}
          <div 
            onClick={onProfileClick}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative">
              <img src={contact.avatar} alt={contact.name} className="w-9 h-9 rounded-full object-cover group-hover:opacity-80 transition-opacity" />
              {contact.status === 'online' && (
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
              )}
            </div>
            <div>
              <h4 className="font-bold text-sm text-gray-800 dark:text-gray-100 group-hover:text-primary transition-colors">{contact.name}</h4>
              <span className="text-[10px] text-green-500 flex items-center gap-1">
                {contact.status === 'online' ? 'Sedang Online' : 'Terakhir dilihat baru saja'}
              </span>
            </div>
          </div>
        </div>
        
        {/* Tombol Kanan Header */}
        <div className="flex gap-1">
           <button 
              onClick={() => { setIsSearchOpen(!isSearchOpen); setIsOptionOpen(false); }}
              className={`w-8 h-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center transition-colors ${isSearchOpen ? 'bg-gray-100 dark:bg-gray-800 text-primary' : 'text-gray-500'}`}
           >
              <Icon icon="fluent:search-24-regular" className="text-xl" />
           </button>
           <button 
              onClick={() => { setIsOptionOpen(!isOptionOpen); setIsSearchOpen(false); }}
              className={`w-8 h-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center transition-colors ${isOptionOpen ? 'bg-gray-100 dark:bg-gray-800 text-primary' : 'text-gray-500'}`}
           >
              <Icon icon="fluent:more-vertical-24-regular" className="text-xl" />
           </button>
        </div>
      </div>

      {/* Komponen Search Dialog (Muncul di bawah header) */}
      <AnimatePresence>
        {isSearchOpen && (
            <SearchDialog 
                onClose={() => setIsSearchOpen(false)} 
                onSearch={handleSearch} 
            />
        )}
      </AnimatePresence>

      {/* Komponen Option Dropdown (Muncul di pojok kanan) */}
      <AnimatePresence>
        {isOptionOpen && (
            <HeaderOptionDropdown 
                onClose={() => setIsOptionOpen(false)}
                onSelect={handleOptionSelect}
            />
        )}
      </AnimatePresence>

    </div>
  );
}