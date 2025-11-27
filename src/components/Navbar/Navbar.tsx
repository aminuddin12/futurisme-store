'use client';

import { useState, useEffect } from 'react';
import TopBar from './Parts/TopBar';
import CenterBar from './Parts/CenterBar';
import NavBar from './Parts/NavBar';
import Sidebar from './Parts/Sidebar'; // Import Sidebar

export default function Navbar() {
  const [showNavBottom, setShowNavBottom] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State untuk Sidebar

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isAtTop = currentScrollY < 50;
      const isScrollingDown = currentScrollY > lastScrollY;

      if (isAtTop) {
        setShowNavBottom(true);
      } else if (isScrollingDown) {
        setShowNavBottom(false);
      } else {
        setShowNavBottom(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* Sidebar Component (Overlay) */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <header className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm border-b border-gray-100 dark:border-gray-800 fixed w-full top-0 z-50 transition-all duration-300" id="navbar">
        <TopBar />
        {/* Teruskan fungsi buka sidebar ke CenterBar */}
        <CenterBar onSidebarClick={() => setIsSidebarOpen(true)} />
        <NavBar show={showNavBottom} />
      </header>
    </>
  );
}