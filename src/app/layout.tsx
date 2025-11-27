// @ts-expect-error: Allow side-effect import of global CSS without type declarations
import './globals.css';
import { Inter } from 'next/font/google';
import { Providers } from '@/components/Theme/Providers';
import BottomNavbar from '@/components/Navbar/BottomNavbar';
import ChatBaloon from '@/components/Chat/ChatBaloon';
import OfflinePage from '@/components/Offline/OfflinePage';
import CustomHomePopup from '@/components/Popup/CustomHomePopup';
import GlobalSearchPopup from '@/components/Popup/GlobalSearchPopup';
import { MSWProvider } from '@/components/Providers/MSWProvider';
import AppConfigWrapper from '@/components/Wrappers/AppConfigWrapper';
import EnvChecker from '@/components/Wrappers/EnvChecker'; // Import Checker

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
          {/* 1. Env Checker: Validasi Kunci API sebelum aplikasi jalan */}
          <EnvChecker>
            
            <MSWProvider>
              
              {/* 2. AppConfigWrapper: Cek Maintenance Mode */}
              <AppConfigWrapper>
                  
                  {children}
                  
                  <BottomNavbar />

                  <div className="hidden lg:block">
                    <ChatBaloon />
                  </div>
                  
                  <OfflinePage />
                  <CustomHomePopup />
                  <GlobalSearchPopup />

              </AppConfigWrapper>

            </MSWProvider>

          </EnvChecker>
        </Providers>
      </body>
    </html>
  );
}