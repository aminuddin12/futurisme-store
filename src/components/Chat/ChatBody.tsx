import { Message } from './types';
import SenderBaloon from './Baloon/SenderBaloon';
import ReceiverBaloon from './Baloon/ReceiverBaloon';

interface ChatBodyProps {
  messages: Message[];
}

export default function ChatBody({ messages }: ChatBodyProps) {
  return (
    // Penambahan class 'overscroll-y-contain' mencegah scroll menembus ke lapisan bawah
    <div className="flex-1 overflow-y-auto overscroll-y-contain p-4 pt-[70px] pb-4 space-y-4 bg-white dark:bg-gray-950 scrollbar-hide">
      {/* Tanggal */}
      <div className="text-center my-4">
        <span className="text-[10px] bg-gray-100 dark:bg-gray-800 text-gray-500 px-3 py-1 rounded-full">Hari Ini</span>
      </div>

      {/* List Pesan */}
      {messages.map((msg) => (
        msg.sender === 'me' ? (
          <SenderBaloon key={msg.id} message={msg} />
        ) : (
          <ReceiverBaloon key={msg.id} message={msg} />
        )
      ))}
    </div>
  );
}