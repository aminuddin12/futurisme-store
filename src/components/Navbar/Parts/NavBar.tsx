'use client';

interface NavBarProps {
  show: boolean;
}

export default function NavBar({ show }: NavBarProps) {
  return (
    <div 
      className={`border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 transition-all duration-300 origin-top overflow-hidden ${
        show ? 'max-h-[100px] opacity-100 mt-0' : 'max-h-0 opacity-0 -mt-2'
      }`}
    >
      <div className="container mx-auto px-4">
        {/* Nav Links */}
        <nav className="flex gap-6 text-xs font-medium text-gray-500 dark:text-gray-400 overflow-x-auto py-2 scrollbar-hide">
          {['Rekomendasi', 'Gadget', 'Fashion Pria', 'Fashion Wanita', 'Elektronik', 'Rumah Tangga'].map((item) => (
            <a key={item} href="#" className="hover:text-primary whitespace-nowrap transition pb-1 hover:border-b-2 hover:border-gray-200 dark:hover:border-gray-700">
              {item}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}