'use client';

import Link from 'next/link';

export default function Logo() {
  return (
    <Link 
      href="/" 
      className="text-2xl font-extrabold text-primary tracking-tighter flex items-center gap-1 group"
    >
      <i className="fas fa-shopping-bag group-hover:rotate-12 transition-transform"></i>
      <span>SHOP</span>
    </Link>
  );
}