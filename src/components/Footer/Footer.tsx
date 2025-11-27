'use client';

import { useWebConfig } from '@/context/WebConfigContext';
import { Icon } from '@iconify/react';
import Link from 'next/link';

export default function Footer() {
  const { getConfig } = useWebConfig();
  
  // Mengambil data dinamis
  const appInfo = getConfig('app_info');
  const socialMedia = getConfig('social_media');
  const contact = getConfig('support_contact');

  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 pt-12 pb-8 mt-auto">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                {/* Kolom 1: Brand Info */}
                <div>
                    <h4 className="font-bold text-xl text-primary mb-4 flex items-center gap-2">
                        <Icon icon="solar:shop-2-bold-duotone" />
                        {appInfo?.name || 'ShopModern'}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
                        {appInfo?.description || 'Platform belanja online modern.'}
                    </p>
                    
                    {/* Social Media Icons */}
                    {socialMedia && (
                        <div className="flex gap-3">
                            {socialMedia.instagram && (
                                <Link href={socialMedia.instagram} target="_blank" className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:bg-pink-500 hover:text-white transition-colors">
                                    <Icon icon="mdi:instagram" />
                                </Link>
                            )}
                            {socialMedia.facebook && (
                                <Link href={socialMedia.facebook} target="_blank" className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:bg-blue-600 hover:text-white transition-colors">
                                    <Icon icon="mdi:facebook" />
                                </Link>
                            )}
                            {socialMedia.twitter && (
                                <Link href={socialMedia.twitter} target="_blank" className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:bg-black hover:text-white transition-colors">
                                    <Icon icon="mdi:twitter" />
                                </Link>
                            )}
                             {socialMedia.youtube && (
                                <Link href={socialMedia.youtube} target="_blank" className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:bg-red-600 hover:text-white transition-colors">
                                    <Icon icon="mdi:youtube" />
                                </Link>
                            )}
                        </div>
                    )}
                </div>

                {/* Kolom 2: Layanan Pelanggan */}
                <div>
                    <h5 className="font-bold text-gray-800 dark:text-white mb-4">Layanan</h5>
                    <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                        <li><a href="#" className="hover:text-primary transition">Bantuan</a></li>
                        <li><a href="#" className="hover:text-primary transition">Metode Pembayaran</a></li>
                        <li><a href="#" className="hover:text-primary transition">Pengiriman</a></li>
                        <li><a href="#" className="hover:text-primary transition">Hubungi Kami</a></li>
                    </ul>
                </div>

                {/* Kolom 3: Jelajahi */}
                <div>
                    <h5 className="font-bold text-gray-800 dark:text-white mb-4">Jelajahi</h5>
                    <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                        <li><a href="#" className="hover:text-primary transition">Tentang Kami</a></li>
                        <li><a href="#" className="hover:text-primary transition">Kebijakan Privasi</a></li>
                        <li><a href="#" className="hover:text-primary transition">Syarat & Ketentuan</a></li>
                        <li><a href="#" className="hover:text-primary transition">Flash Sale</a></li>
                    </ul>
                </div>

                {/* Kolom 4: Kontak */}
                <div>
                    <h5 className="font-bold text-gray-800 dark:text-white mb-4">Hubungi Kami</h5>
                    <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
                        {contact?.address && (
                            <li className="flex items-start gap-2">
                                <Icon icon="solar:map-point-bold-duotone" className="text-primary mt-0.5" />
                                <span>{contact.address}</span>
                            </li>
                        )}
                        {contact?.email && (
                            <li className="flex items-center gap-2">
                                <Icon icon="solar:letter-bold-duotone" className="text-primary" />
                                <span>{contact.email}</span>
                            </li>
                        )}
                        {contact?.phone && (
                            <li className="flex items-center gap-2">
                                <Icon icon="solar:phone-calling-bold-duotone" className="text-primary" />
                                <span>{contact.phone}</span>
                            </li>
                        )}
                    </ul>
                </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-gray-100 dark:border-gray-800 pt-6 text-center text-gray-400 text-xs">
                <p>{appInfo?.copyright || `© ${new Date().getFullYear()} ShopModern. All rights reserved.`}</p>
            </div>
        </div>
    </footer>
  );
}