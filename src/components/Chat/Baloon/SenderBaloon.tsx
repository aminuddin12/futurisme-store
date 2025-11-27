import { Message } from '../types';
import { Icon } from '@iconify/react';

interface SenderBaloonProps {
  message: Message;
}

export default function SenderBaloon({ message }: SenderBaloonProps) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[80%] md:max-w-[75%] px-4 py-2.5 rounded-2xl text-sm relative group shadow-sm bg-primary text-white rounded-tr-none">
        
        {/* Tipe Gambar */}
        {message.type === 'image' && message.fileUrl && (
          <div className="mb-2 rounded-lg overflow-hidden">
            <img src={message.fileUrl} alt="Sent Image" className="w-full h-auto max-h-60 object-cover" />
          </div>
        )}

        {/* Tipe Dokumen */}
        {message.type === 'file' && (
          <div className="flex items-center gap-3 mb-2 bg-white/20 p-2 rounded-lg">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-red-500 shrink-0">
              <Icon icon="solar:file-text-bold-duotone" className="text-2xl" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold truncate text-white">{message.fileName}</p>
              <p className="text-xs text-green-100">{message.fileSize} • PDF</p>
            </div>
            <Icon icon="solar:download-minimalistic-bold-duotone" className="text-xl text-white cursor-pointer hover:scale-110 transition-transform" />
          </div>
        )}

        {/* Teks (Jika ada) */}
        {message.text && (
          <p className="whitespace-pre-wrap">{message.text}</p>
        )}

        <div className="text-[9px] mt-1 text-right opacity-70 text-green-100 flex items-center justify-end gap-1">
          {message.time}
          <Icon icon="solar:check-read-linear" className="text-xs" />
        </div>
      </div>
    </div>
  );
}