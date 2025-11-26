import { Message } from '../types';

interface ReceiverBaloonProps {
  message: Message;
}

export default function ReceiverBaloon({ message }: ReceiverBaloonProps) {
  return (
    <div className="flex justify-start">
      <div className="max-w-[80%] md:max-w-[75%] px-4 py-2.5 rounded-2xl text-sm relative group shadow-sm bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-none">
        <p>{message.text}</p>
        <div className="text-[9px] mt-1 text-right opacity-70 text-gray-400">
          {message.time}
        </div>
      </div>
    </div>
  );
}