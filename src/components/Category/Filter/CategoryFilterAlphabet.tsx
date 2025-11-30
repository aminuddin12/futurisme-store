'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Icon } from '@iconify/react';

interface CategoryItem {
  id: number;
  name: string;
  slug: string;
}

interface CategoryFilterAlphabetProps {
  data: CategoryItem[];
}

export default function CategoryFilterAlphabet({ data }: CategoryFilterAlphabetProps) {
  const [activeLetter, setActiveLetter] = useState<string>('A');
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Grouping data by first letter
  const groupedData = data.reduce((acc, item) => {
    const letter = item.name.charAt(0).toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(item);
    return acc;
  }, {} as Record<string, CategoryItem[]>);

  // Scroll Spy Logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Ambil huruf dari ID section (misal "section-A" -> "A")
            const letter = entry.target.id.replace('section-', '');
            setActiveLetter(letter);
          }
        });
      },
      {
        root: null, // viewport
        rootMargin: '-20% 0px -60% 0px', // Trigger di tengah-tengah layar agak atas
        threshold: 0
      }
    );

    Object.values(sectionRefs.current).forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToLetter = (letter: string) => {
    const section = sectionRefs.current[letter];
    if (section) {
      // Scroll dengan offset untuk header sticky
      const yOffset = -180; 
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveLetter(letter);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 min-h-[600px] pt-40 relative">
      
      {/* Sidebar Alfabet (Sticky Kiri) */}
      <div className="w-full md:w-32 shrink-0 relative z-10">
        <div className="sticky top-32 flex md:flex-col gap-1 overflow-x-auto md:overflow-visible pb-4 md:pb-0 scrollbar-hide md:h-[calc(100vh-200px)] md:justify-center">
          {letters.map((letter) => {
            const isActive = activeLetter === letter;
            const hasData = groupedData[letter] && groupedData[letter].length > 0;

            if (!hasData) return null; // Sembunyikan huruf kosong agar list lebih padat

            return (
              <button
                key={letter}
                onClick={() => scrollToLetter(letter)}
                className={`
                  relative flex-shrink-0 transition-all duration-300 font-black leading-none select-none
                  ${isActive 
                    ? 'text-primary text-6xl md:text-8xl opacity-100 scale-110 origin-left' // Ukuran Besar (100px approx)
                    : 'text-gray-300 dark:text-gray-700 text-2xl md:text-4xl opacity-40 hover:opacity-80 hover:text-gray-400'
                  }
                `}
              >
                {letter}
                {isActive && (
                    <motion.div 
                        layoutId="activeDot"
                        className="absolute -right-2 top-0 w-2 h-2 bg-primary rounded-full"
                    />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Konten Kategori (Scrollable List) */}
      <div ref={containerRef} className="flex-1 space-y-16 pb-32">
        {letters.map((letter) => {
            const items = groupedData[letter];
            if (!items || items.length === 0) return null;

            return (
                <div 
                    key={letter} 
                    id={`section-${letter}`}
                    ref={(el) => {
                        if (sectionRefs.current) {
                            sectionRefs.current[letter] = el;
                        }
                    }}
                    className="scroll-mt-32"
                >
                    {/* Header Per Huruf */}
                    <div className="flex items-center gap-4 mb-6 border-b border-gray-100 dark:border-gray-800 pb-2">
                        <h2 className="text-4xl font-bold text-gray-200 dark:text-gray-800">{letter}</h2>
                        <div className="h-px flex-1 bg-gray-100 dark:bg-gray-800"></div>
                        <span className="text-xs text-gray-400">{items.length} Kategori</span>
                    </div>

                    {/* Grid Item */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {items.map((item) => (
                            <Link 
                                key={item.id} 
                                href={`/category/${item.slug}`}
                                className="group flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-primary/30 dark:hover:border-primary/30 hover:shadow-md transition-all"
                            >
                                <div className="w-10 h-10 rounded-lg bg-gray-50 dark:bg-gray-800 overflow-hidden shrink-0 flex items-center justify-center text-gray-400 group-hover:text-primary transition-colors">
                                    <Icon icon="solar:box-minimalistic-bold-duotone" className="text-xl" />
                                </div>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors line-clamp-1">
                                    {item.name}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            );
        })}
      </div>

    </div>
  );
}