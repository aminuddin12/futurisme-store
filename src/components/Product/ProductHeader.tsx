'use client';

import { useState, useEffect } from 'react';

export default function ProductHeader() {
  const [isVisible, setIsVisible] = useState(false);
  const [topPosition, setTopPosition] = useState(120);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY;

      // Visibility Logic
      setIsVisible(currentScrollY > 300);

      // Position Logic
      if (Math.abs(currentScrollY - lastScrollY) > 5) {
        if (isScrollingDown && currentScrollY > 50) {
          setTopPosition(100); // Naik (Nav Bottom hidden)
        } else {
          setTopPosition(150); // Turun (Nav Bottom show)
        }
      }

      // Scroll Spy Logic
      const sections = ['section-detail', 'section-ulasan', 'section-etalase', 'section-rekomendasi'];
      const scrollPos = currentScrollY + 200;

      sections.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveSection(id);
          }
        }
      });

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 140;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <div 
      className={`fixed left-0 w-full bg-white shadow-md z-40 transition-all duration-300 ease-in-out border-b border-gray-200 hidden md:block ${
        isVisible ? 'translate-y-0' : '-translate-y-[150%]'
      }`}
      style={{ top: `${topPosition}px` }}
    >
      <div className="container mx-auto px-6 h-14 flex items-center justify-between">
        <div className="w-1/4 truncate font-bold text-gray-800 text-sm pr-4 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          ISKU Tool Kit Set 82pcs...
        </div>
        
        <div className="flex-1 flex justify-center gap-8 text-sm font-bold text-gray-500 h-full">
          {['detail', 'ulasan', 'etalase', 'rekomendasi'].map((sec) => (
            <button
              key={sec}
              onClick={() => scrollToSection(`section-${sec}`)}
              className={`h-full flex items-center border-b-2 px-2 transition ${
                activeSection === `section-${sec}` ? 'text-primary border-primary' : 'border-transparent hover:text-primary'
              }`}
            >
              {sec.charAt(0).toUpperCase() + sec.slice(1)}
            </button>
          ))}
        </div>

        <div className="w-1/3 flex justify-end">
           <div className="flex items-center gap-2 cursor-pointer bg-gray-50 p-1.5 rounded-lg">
              <i className="fas fa-map-marker-alt text-primary"></i>
              <div className="text-xs text-right">
                  <div className="text-gray-500">Dikirim ke</div>
                  <div className="font-bold text-gray-800">Rumah Aminudzin</div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}