'use client';

import { useState } from 'react';
import DocsSidebar from '@/components/Documentation/DocsSidebar';
import DocsNavbar from '@/components/Documentation/DocsNavbar';

export default function DocumentationLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-950">
      {/* Sidebar */}
      <DocsSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
        <DocsNavbar onOpenSidebar={() => setIsSidebarOpen(true)} />
        
        <main className="flex-1 px-4 md:px-8 py-10 max-w-5xl mx-auto w-full">
          {children}
        </main>

        {/* Simple Footer for Docs */}
        <footer className="py-8 text-center text-sm text-gray-400 border-t border-gray-100 dark:border-gray-800 mt-10">
          <p>© 2025 Futurisme Store Documentation.</p>
        </footer>
      </div>
    </div>
  );
}