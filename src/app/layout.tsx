// @ts-expect-error: Allow side-effect import of global CSS without type declarations
import './globals.css';
import { Inter } from 'next/font/google';
import { Providers } from '@/components/Theme/Providers';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
        />
        <title>ShopModern - E-Commerce</title>
      </head>
      <body className={`${inter.className} bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100 overflow-x-hidden transition-colors duration-300`}>
        <Providers>
            {children}
        </Providers>
      </body>
    </html>
  );
}