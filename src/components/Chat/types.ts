export interface Message {
  id: number;
  sender: 'me' | 'other';
  text: string;
  time: string;
}

export interface Contact {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  isRead: boolean;
  unreadCount: number;
  status: 'online' | 'offline';
  messages: Message[];
}