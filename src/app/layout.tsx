'use client';

import './globals.css';
import { Inter } from 'next/font/google';
// Hapus import AOS dan useEffect

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // AOS init dihapus karena kita ganti ke Framer Motion

  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
        />
        <title>ShopModern - E-Commerce</title>
      </head>
      <body className={`${inter.className} bg-gray-50 text-gray-800 overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}