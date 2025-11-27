import './globals.css';
import { Inter } from 'next/font/google';
import { Providers } from '@/components/Theme/Providers';
import BottomNavbar from '@/components/Navbar/BottomNavbar';
import ChatBaloon from '@/components/Chat/ChatBaloon';
import OfflinePage from '@/components/Offline/OfflinePage';
import CustomHomePopup from '@/components/Popup/CustomHomePopup'; // Import Popup

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
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
      </head>
      <body className={`${inter.className} bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100 overflow-x-hidden transition-colors duration-300`}>
        <Providers>
            {children}
            
            {/* Bottom Navbar untuk Mobile */}
            <BottomNavbar />

            {/* Chat Widget Global */}
            <ChatBaloon />

            {/* Deteksi Offline Global */}
            <OfflinePage />

            {/* Popup Iklan Global */}
            <CustomHomePopup />
        </Providers>
      </body>
    </html>
  );
}