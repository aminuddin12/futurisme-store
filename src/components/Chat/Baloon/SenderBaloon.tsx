import { Message } from '../types';

interface SenderBaloonProps {
  message: Message;
}

export default function SenderBaloon({ message }: SenderBaloonProps) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[80%] md:max-w-[75%] px-4 py-2.5 rounded-2xl text-sm relative group shadow-sm bg-primary text-white rounded-tr-none">
        <p>{message.text}</p>
        <div className="text-[9px] mt-1 text-right opacity-70 text-green-100">
          {message.time}
        </div>
      </div>
    </div>
  );
}