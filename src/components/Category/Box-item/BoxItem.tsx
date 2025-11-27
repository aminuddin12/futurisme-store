'use client';

import Link from 'next/link';

interface BoxItemProps {
  name: string;
  href: string;
}

export default function BoxItem({ name, href }: BoxItemProps) {
  return (
    <Link 
      href={href}
      className="block text-sm text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary hover:underline transition-colors py-0.5 truncate"
    >
      {name}
    </Link>
  );
}