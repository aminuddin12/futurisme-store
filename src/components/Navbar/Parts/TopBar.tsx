'use client';

export default function TopBar() {
  return (
    <div className="bg-gray-100/50 dark:bg-gray-900 text-[11px] text-gray-500 dark:text-gray-400 py-1 hidden md:block border-b border-transparent dark:border-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4 flex justify-between">
        <div className="flex gap-4">
          <a href="#" className="hover:text-primary transition">Download App</a>
          <a href="#" className="hover:text-primary transition">Tentang Kami</a>
        </div>
        <div>Bantuan & Layanan Pelanggan</div>
      </div>
    </div>
  );
}