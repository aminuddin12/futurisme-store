export interface Message {
  id: number;
  sender: 'me' | 'other';
  text: string;
  time: string;
  type?: 'text' | 'image' | 'file'; // Tipe pesan baru
  fileUrl?: string;                 // URL untuk file/gambar
  fileName?: string;                // Nama file (untuk dokumen)
  fileSize?: string;                // Ukuran file (untuk dokumen)
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