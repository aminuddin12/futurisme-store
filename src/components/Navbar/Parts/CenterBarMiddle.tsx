'use client';

export default function CenterBarMiddle() {
  return (
    <div className="flex-1 relative z-50 flex justify-center lg:block">
      
      {/* Tampilan Mobile: Logo DIHAPUS dari sini (pindah ke CenterBarLeft) */}
      
      {/* Tampilan Desktop: Form Pencarian */}
      <div className="relative hidden lg:block w-full group">
        {/* Input Search */}
        <input 
          type="text" 
          placeholder="Cari di ShopModern..." 
          className="w-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-lg py-2.5 px-4 pl-10 focus:outline-none focus:border-primary focus:ring-2 focus:ring-green-100 dark:focus:ring-green-900/30 focus:bg-white dark:focus:bg-gray-900 transition-all shadow-sm placeholder-gray-400 dark:placeholder-gray-500" 
        />
        {/* Icon Search */}
        <i className="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 group-focus-within:text-primary transition-colors"></i>
      </div>

    </div>
  );
}