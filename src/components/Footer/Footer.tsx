'use client';

import { useWebConfig } from '@/context/WebConfigContext';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import LogoDefault from '../LogoDefault'; // Import Logo Baru

export default function Footer() {
  const { getConfig } = useWebConfig();
  
  const appInfo = getConfig('app_info');
  const socialMedia = getConfig('social_media');
  const contact = getConfig('support_contact');

  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 pt-12 pb-8 mt-auto">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                {/* Kolom 1: Brand Info */}
                <div>
                    {/* Logo Utama */}
                    <div className="mb-6">
                        <LogoDefault className="scale-100 origin-left" />
                    </div>

                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 leading-relaxed max-w-xs">
                        {appInfo?.description || 'Platform belanja online modern dengan teknologi masa depan.'}
                    </p>
                    
                    {/* Social Media Icons */}
                    {socialMedia && (
                        <div className="flex gap-3">
                            {socialMedia.instagram && (
                                <Link href={socialMedia.instagram} target="_blank" className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:bg-pink-500 hover:text-white transition-all">
                                    <Icon icon="mdi:instagram" className="text-lg" />
                                </Link>
                            )}
                            {socialMedia.facebook && (
                                <Link href={socialMedia.facebook} target="_blank" className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:bg-blue-600 hover:text-white transition-all">
                                    <Icon icon="mdi:facebook" className="text-lg" />
                                </Link>
                            )}
                            {socialMedia.twitter && (
                                <Link href={socialMedia.twitter} target="_blank" className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:bg-black hover:text-white transition-all">
                                    <Icon icon="mdi:twitter" className="text-lg" />
                                </Link>
                            )}
                             {socialMedia.youtube && (
                                <Link href={socialMedia.youtube} target="_blank" className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:bg-red-600 hover:text-white transition-all">
                                    <Icon icon="mdi:youtube" className="text-lg" />
                                </Link>
                            )}
                        </div>
                    )}
                </div>

                {/* Kolom 2: Layanan Pelanggan */}
                <div>
                    <h5 className="font-bold text-gray-800 dark:text-white mb-4">Layanan</h5>
                    <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
                        <li><a href="#" className="hover:text-primary transition-colors">Bantuan & FAQ</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">Metode Pembayaran</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">Lacak Pengiriman</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">Pengembalian Barang</a></li>
                    </ul>
                </div>

                {/* Kolom 3: Jelajahi */}
                <div>
                    <h5 className="font-bold text-gray-800 dark:text-white mb-4">Jelajahi</h5>
                    <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
                        <li><a href="#" className="hover:text-primary transition-colors">Tentang Futurisme</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">Kebijakan Privasi</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">Syarat & Ketentuan</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">Program Afiliasi</a></li>
                    </ul>
                </div>

                {/* Kolom 4: Kontak */}
                <div>
                    <h5 className="font-bold text-gray-800 dark:text-white mb-4">Hubungi Kami</h5>
                    <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400">
                        {contact?.address && (
                            <li className="flex items-start gap-3">
                                <Icon icon="solar:map-point-bold-duotone" className="text-primary text-lg shrink-0 mt-0.5" />
                                <span className="leading-snug">{contact.address}</span>
                            </li>
                        )}
                        {contact?.email && (
                            <li className="flex items-center gap-3">
                                <Icon icon="solar:letter-bold-duotone" className="text-primary text-lg shrink-0" />
                                <span>{contact.email}</span>
                            </li>
                        )}
                        {contact?.phone && (
                            <li className="flex items-center gap-3">
                                <Icon icon="solar:phone-calling-bold-duotone" className="text-primary text-lg shrink-0" />
                                <span>{contact.phone}</span>
                            </li>
                        )}
                    </ul>
                </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-gray-100 dark:border-gray-800 pt-8 text-center">
                <p className="text-gray-400 text-xs">
                    {appInfo?.copyright || `© ${new Date().getFullYear()} Futurisme Store. All rights reserved.`}
                </p>
            </div>
        </div>
    </footer>
  );
}