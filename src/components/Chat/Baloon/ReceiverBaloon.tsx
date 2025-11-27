import { Message } from '../types';
import { Icon } from '@iconify/react';

interface ReceiverBaloonProps {
  message: Message;
}

export default function ReceiverBaloon({ message }: ReceiverBaloonProps) {
  return (
    <div className="flex justify-start">
      <div className="max-w-[80%] md:max-w-[75%] px-4 py-2.5 rounded-2xl text-sm relative group shadow-sm bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-none">
        
        {/* Tipe Gambar */}
        {message.type === 'image' && message.fileUrl && (
          <div className="mb-2 rounded-lg overflow-hidden">
            <img src={message.fileUrl} alt="Received Image" className="w-full h-auto max-h-60 object-cover" />
          </div>
        )}

        {/* Tipe Dokumen */}
        {message.type === 'file' && (
          <div className="flex items-center gap-3 mb-2 bg-white dark:bg-gray-900 p-2 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center text-red-500 shrink-0">
              <Icon icon="solar:file-text-bold-duotone" className="text-2xl" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold truncate text-gray-800 dark:text-gray-200">{message.fileName}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{message.fileSize} • PDF</p>
            </div>
            <Icon icon="solar:download-minimalistic-bold-duotone" className="text-xl text-primary cursor-pointer hover:scale-110 transition-transform" />
          </div>
        )}

        {/* Teks */}
        {message.text && (
          <p className="whitespace-pre-wrap">{message.text}</p>
        )}

        <div className="text-[9px] mt-1 text-right opacity-70 text-gray-400">
          {message.time}
        </div>
      </div>
    </div>
  );
}