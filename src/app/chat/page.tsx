'use client';

import Navbar from '@/components/Navbar/Navbar';
import ChatPage from '@/components/Chat/ChatPage';

export default function MobileChat() {
  return (
    <main className="bg-gray-50 dark:bg-gray-900 min-h-screen pb-24 pt-safe">
      
      {/* Navbar Global - Disembunyikan di Mobile karena Chat punya header sendiri */}
      <div className="hidden md:block">
        <Navbar />
      </div>

      {/* Spacer untuk Fixed Navbar Desktop */}
      {/* UPDATE: Tinggi spacer diubah menjadi h-40 agar tidak tertutup navbar */}
      <div className="hidden md:block h-40"></div>

      {/* Container Utama Halaman Chat */}
      <div className="container mx-auto px-0 md:px-6 h-full">
        <ChatPage />
      </div>
    </main>
  );
}