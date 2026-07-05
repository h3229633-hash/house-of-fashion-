'use client';
import { useState } from 'react';
import Link from 'next/link';

const MENU_ITEMS = [
  { label: 'Home', href: '/' },
  { label: '2PC', href: '/2pc' },
  { label: '3PC', href: '/3pc' },
  { label: 'Festive Wear', href: '/festive-wear' },
  { label: 'New Arrival', href: '/new-arrival' },
  { label: 'Best Sellers', href: '/best-sellers' },
  { label: '50% Discount', href: '/discount' },
  { label: 'Contact Us', href: '/contact-us' },
  { label: 'Login', href: '/login' },
];

export default function Header({ onCartOpen }: { onCartOpen: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[200] h-9 overflow-hidden bg-[#111] text-white">
        <div className="flex w-max h-full animate-marquee">
          {[0, 1].map((group) => (
            <div key={group} className="flex items-center flex-shrink-0 gap-16 pr-16 h-full">
              {[1, 2, 3, 4].map((i) => (
                <span key={i} className="whitespace-nowrap text-[0.72rem] font-semibold tracking-wide">
                  Avail 10% OFF Use code: VM26BZSV at checkout
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <header className="fixed top-9 left-0 right-0 z-[150] h-16 grid grid-cols-[48px_1fr_80px] md:grid-cols-[60px_1fr_100px] items-center px-3 md:px-6 bg-white border-b border-black/8">
        <button
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          className="flex flex-col justify-center gap-[5px] w-10 h-10 p-1.5"
        >
          <span className="block w-5.5 h-0.5 bg-[#111]" />
          <span className="block w-5.5 h-0.5 bg-[#111]" />
          <span className="block w-5.5 h-0.5 bg-[#111]" />
        </button>

        <Link href="/" className="flex items-center justify-center gap-2 md:gap-3 text-[#111]">
          <span className="relative flex items-center justify-center w-10.5 h-10.5">
            <span className="absolute -top-0.5 text-[0.65rem] text-(--color-gold)">♛</span>
            <span className="font-(family-name:--font-display) text-lg font-semibold text-(--color-gold) tracking-wide">HF</span>
          </span>
          <span className="text-[0.62rem] md:text-xs font-semibold tracking-widest uppercase leading-tight max-w-[90px] md:max-w-none">
            House Of Fashion
          </span>
        </Link>

        <div className="flex items-center justify-end gap-1">
          <Link href="/login" aria-label="Account" className="flex items-center justify-center w-9 h-9 text-[#111]">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </Link>
          <button
            onClick={onCartOpen}
            aria-label="Cart"
            className="relative flex items-center justify-center w-9 h-9 text-[#111]"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            <span className="absolute top-0 -right-0.5 min-w-4 h-4 px-1 rounded-full bg-(--color-gold) text-white text-[0.6rem] font-semibold flex items-center justify-center">
              0
            </span>
          </button>
        </div>
      </header>

      {menuOpen && (
        <div
          className="fixed inset-0 z-[250] bg-black/40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 w-[min(320px,85vw)] h-screen bg-white z-[280] pt-28 px-6 pb-8 overflow-y-auto transition-transform duration-300 ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <nav>
          <ul className="border-t border-black/15">
            {MENU_ITEMS.map((item) => (
              <li key={item.href} className="border-b border-black/15">
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block py-4 text-base hover:text-(--color-accent) transition-colors ${
                    item.label === 'Login' ? 'text-sm' : ''
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}