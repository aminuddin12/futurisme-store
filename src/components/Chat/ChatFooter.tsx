import { useState } from 'react';
import { Icon } from '@iconify/react';

interface ChatFooterProps {
  onSendMessage: (text: string) => void;
}

export default function ChatFooter({ onSendMessage }: ChatFooterProps) {
  const [messageInput, setMessageInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    onSendMessage(messageInput);
    setMessageInput('');
  };

  return (
    <div className="p-3 md:p-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 z-20 h-[70px] flex items-center">
      <form onSubmit={handleSubmit} className="flex items-end gap-2 w-full bg-gray-50 dark:bg-gray-900 p-2 rounded-[24px] border border-gray-200 dark:border-gray-800 focus-within:border-primary/50 focus-within:ring-2 ring-primary/10 transition-all">
        
        {/* Tombol Add */}
        <button type="button" className="w-9 h-9 rounded-full text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 flex items-center justify-center transition-colors shrink-0">
          <Icon icon="fluent:add-circle-24-regular" className="text-2xl" />
        </button>
        
        <input 
          type="text" 
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Ketik pesan..." 
          className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 py-2"
          autoComplete="off"
        />
        
        {/* Tombol Kirim / Mic */}
        <button 
          type="submit"
          disabled={!messageInput.trim()} 
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-sm shrink-0
            ${messageInput.trim() 
              ? 'bg-primary text-white hover:bg-green-600 hover:scale-105' 
              : 'bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
            }`}
        >
          <Icon icon={messageInput.trim() ? "fluent:send-24-filled" : "fluent:mic-24-regular"} className="text-lg" />
        </button>
      </form>
    </div>
  );
}