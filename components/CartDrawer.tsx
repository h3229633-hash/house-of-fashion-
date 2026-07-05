'use client';

export default function CartDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-[1050] bg-black/35 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      <div
        className={`fixed top-0 right-0 w-[340px] max-w-full h-screen bg-white z-[1100] flex flex-col overflow-hidden transition-transform duration-300 shadow-2xl ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4.5 border-b border-[#e0ddd8] flex-shrink-0">
          <span className="font-(family-name:--font-display) text-lg font-semibold text-[#222] tracking-wide">
            Shopping Cart
          </span>
          <button
            onClick={onClose}
            aria-label="Close cart"
            className="text-2xl text-[#555] hover:text-[#111] transition-colors leading-none px-1.5 py-0.5"
          >
            &times;
          </button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-6 py-10 gap-3.5">
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#d8d5d0"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          <p className="font-(family-name:--font-display) text-xl font-semibold text-[#222] tracking-wide">
            No products in the cart
          </p>
          <p className="text-sm text-[#777] text-center leading-relaxed">
            Looks like you haven&apos;t added anything yet.
            <br />
            Start shopping to fill it up.
          </p>
        </div>
      </div>
    </>
  );
}
