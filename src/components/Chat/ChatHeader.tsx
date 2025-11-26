import { Icon } from '@iconify/react';
import { Contact } from './types';

interface ChatHeaderProps {
  contact: Contact;
  onBack: () => void;
}

export default function ChatHeader({ contact, onBack }: ChatHeaderProps) {
  return (
    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm absolute top-0 left-0 w-full z-10 h-[60px]">
      <div className="flex items-center gap-3">
        {/* Tombol Back (Hanya Mobile) */}
        <button 
          onClick={onBack}
          className="md:hidden w-8 h-8 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 transition-colors"
        >
          <Icon icon="fluent:arrow-left-24-regular" className="text-xl" />
        </button>

        <div className="relative">
          <img src={contact.avatar} alt={contact.name} className="w-9 h-9 rounded-full object-cover" />
          {contact.status === 'online' && (
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
          )}
        </div>
        <div>
          <h4 className="font-bold text-sm text-gray-800 dark:text-gray-100">{contact.name}</h4>
          <span className="text-[10px] text-green-500 flex items-center gap-1">
            {contact.status === 'online' ? 'Sedang Online' : 'Terakhir dilihat baru saja'}
          </span>
        </div>
      </div>
      
      {/* Tombol close dihapus dari sini */}
    </div>
  );
}