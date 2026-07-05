'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import CartDrawer from '../../components/CartDrawer';
import Footer from '../../components/Footer';

type CartItem = {
  id: string;
  name: string;
  price: number;
  img: string;
  size: string;
  qty: number;
};

export default function CheckoutPage() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(0);
  const [toast, setToast] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    company: '',
    country: 'PK',
    street: '',
    street2: '',
    city: '',
    state: '',
    phone: '',
    email: '',
    notes: '',
  });

  useEffect(() => {
    const stored = localStorage.getItem('hof_cart');
    if (stored) setCart(JSON.parse(stored));
  }, []);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  }

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const total = subtotal - discountApplied;

  function applyDiscount() {
    const code = discountCode.trim().toUpperCase();
    if (!code) {
      showToast('Please enter a discount code.');
      return;
    }
    if (code === 'VM26BZSV') {
      setDiscountApplied(Math.round(subtotal * 0.1));
      showToast('✓ 10% discount applied!');
    } else {
      setDiscountApplied(0);
      showToast('Invalid discount code.');
    }
  }

  function placeOrder() {
    if (!form.firstName || !form.lastName || !form.street || !form.city || !form.phone || !form.email) {
      showToast('Please fill in all required fields.');
      return;
    }
    localStorage.removeItem('hof_cart');
    setCart([]);
    setOrderPlaced(true);
    showToast('✓ Order placed successfully! Thank you.');
  }

  return (
    <div className="bg-white">
      <Header onCartOpen={() => setCartOpen(true)} />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      {toast && (
        <div className="fixed bottom-7 left-1/2 -translate-x-1/2 bg-[#111] text-white text-sm font-medium px-6 py-3 rounded z-[9999] shadow-lg">
          {toast}
        </div>
      )}

      <div className="pt-[100px] bg-white min-h-screen">
        <nav className="max-w-[1200px] mx-auto px-6 py-3.5 text-xs text-[#999] flex gap-1.5 items-center">
          <Link href="/" className="text-[#888] hover:text-(--color-gold)">Home</Link>
          <span className="text-[#ccc]">/</span>
          <span className="text-[#444]">Checkout</span>
        </nav>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 py-20 gap-4 text-center max-w-[1200px] mx-auto">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#ddd" strokeWidth="0.8">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <p className="font-(family-name:--font-display) text-2xl font-semibold text-[#1a1a1a]">
              {orderPlaced ? 'Your order is confirmed!' : 'Your cart is empty'}
            </p>
            <p className="text-sm text-[#888] leading-relaxed">
              {orderPlaced
                ? "We'll contact you soon regarding your order."
                : 'Add some products to your cart before proceeding to checkout.'}
            </p>
            <Link
              href="/shop"
              className="mt-1 inline-block px-8 py-3.5 bg-[#111] text-white text-xs font-semibold uppercase tracking-wide rounded-sm hover:bg-(--color-gold) transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="max-w-[1200px] mx-auto px-6 pb-20 grid grid-cols-1 md:grid-cols-[1fr_420px] gap-8 md:gap-12 items-start">
            {/* Billing Form */}
            <div>
              <h1 className="font-(family-name:--font-display) text-[28px] font-semibold text-[#1a1a1a] mb-7">
                Checkout
              </h1>
              <div className="bg-white border border-[#e8e5e0] rounded-sm px-7 py-8">
                <h2 className="font-(family-name:--font-display) text-xl font-semibold text-[#1a1a1a] mb-6 pb-3.5 border-b border-[#e8e5e0]">
                  Billing Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-[#444]">
                      First Name <span className="text-[#c0392b]">*</span>
                    </label>
                    <input
                      value={form.firstName}
                      onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-[#ddd] rounded-sm text-sm outline-none focus:border-(--color-gold) focus:ring-2 focus:ring-(--color-gold)/10"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-[#444]">
                      Last Name <span className="text-[#c0392b]">*</span>
                    </label>
                    <input
                      value={form.lastName}
                      onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-[#ddd] rounded-sm text-sm outline-none focus:border-(--color-gold) focus:ring-2 focus:ring-(--color-gold)/10"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 mb-4">
                  <label className="text-xs font-medium text-[#444]">Company Name (optional)</label>
                  <input
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-[#ddd] rounded-sm text-sm outline-none focus:border-(--color-gold) focus:ring-2 focus:ring-(--color-gold)/10"
                  />
                </div>

                <div className="flex flex-col gap-1.5 mb-4">
                  <label className="text-xs font-medium text-[#444]">
                    Country / Region <span className="text-[#c0392b]">*</span>
                  </label>
                  <select
                    value={form.country}
                    onChange={(e) => setForm({ ...form, country: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-[#ddd] rounded-sm text-sm outline-none focus:border-(--color-gold) bg-white"
                  >
                    <option value="PK">Pakistan</option>
                    <option value="US">United States</option>
                    <option value="GB">United Kingdom</option>
                    <option value="AE">United Arab Emirates</option>
                    <option value="SA">Saudi Arabia</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5 mb-4">
                  <label className="text-xs font-medium text-[#444]">
                    Street Address <span className="text-[#c0392b]">*</span>
                  </label>
                  <input
                    value={form.street}
                    onChange={(e) => setForm({ ...form, street: e.target.value })}
                    placeholder="House number and street name"
                    className="w-full px-3.5 py-2.5 border border-[#ddd] rounded-sm text-sm outline-none focus:border-(--color-gold) focus:ring-2 focus:ring-(--color-gold)/10 mb-2"
                  />
                  <input
                    value={form.street2}
                    onChange={(e) => setForm({ ...form, street2: e.target.value })}
                    placeholder="Apartment, suite, unit, etc. (optional)"
                    className="w-full px-3.5 py-2.5 border border-[#ddd] rounded-sm text-sm outline-none focus:border-(--color-gold) focus:ring-2 focus:ring-(--color-gold)/10"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-[#444]">
                      City <span className="text-[#c0392b]">*</span>
                    </label>
                    <input
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-[#ddd] rounded-sm text-sm outline-none focus:border-(--color-gold) focus:ring-2 focus:ring-(--color-gold)/10"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-[#444]">State / Province</label>
                    <input
                      value={form.state}
                      onChange={(e) => setForm({ ...form, state: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-[#ddd] rounded-sm text-sm outline-none focus:border-(--color-gold) focus:ring-2 focus:ring-(--color-gold)/10"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 mb-4">
                  <label className="text-xs font-medium text-[#444]">
                    Phone <span className="text-[#c0392b]">*</span>
                  </label>
                  <input
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="03XX-XXXXXXX"
                    className="w-full px-3.5 py-2.5 border border-[#ddd] rounded-sm text-sm outline-none focus:border-(--color-gold) focus:ring-2 focus:ring-(--color-gold)/10"
                  />
                </div>

                <div className="flex flex-col gap-1.5 mb-4">
                  <label className="text-xs font-medium text-[#444]">
                    Email Address <span className="text-[#c0392b]">*</span>
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full px-3.5 py-2.5 border border-[#ddd] rounded-sm text-sm outline-none focus:border-(--color-gold) focus:ring-2 focus:ring-(--color-gold)/10"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-[#444]">Order Notes (optional)</label>
                  <textarea
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    placeholder="Notes about your order, e.g. special notes for delivery."
                    className="w-full px-3.5 py-2.5 border border-[#ddd] rounded-sm text-sm outline-none focus:border-(--color-gold) focus:ring-2 focus:ring-(--color-gold)/10 min-h-[90px] resize-y"
                  />
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="md:sticky md:top-[110px]">
              <div className="bg-white border border-[#e8e5e0] rounded-sm px-6 py-7 mb-4">
                <h2 className="font-(family-name:--font-display) text-xl font-semibold text-[#1a1a1a] mb-5 pb-3.5 border-b border-[#e8e5e0]">
                  Your Order
                </h2>
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="text-[11px] font-semibold uppercase tracking-wide text-[#999] pb-2.5 text-left border-b border-[#e8e5e0]">
                        Product
                      </th>
                      <th className="text-[11px] font-semibold uppercase tracking-wide text-[#999] pb-2.5 text-right border-b border-[#e8e5e0]">
                        Subtotal
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item, idx) => (
                      <tr key={idx}>
                        <td className="py-3 border-b border-[#f5f3f0] align-top">
                          <div className="text-[13px] text-[#333] leading-relaxed">{item.name}</div>
                          <div className="text-[11px] text-[#999] mt-0.5">
                            Size: {item.size} × {item.qty}
                          </div>
                        </td>
                        <td className="py-3 border-b border-[#f5f3f0] text-right text-[13px] font-medium text-[#222] align-top">
                          Rs {(item.price * item.qty).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="mt-1">
                  <div className="flex justify-between items-center py-2.5 border-b border-[#f5f3f0]">
                    <span className="text-[13px] text-[#555]">Subtotal</span>
                    <span className="text-[13px] font-medium text-[#222]">Rs {subtotal.toLocaleString()}</span>
                  </div>
                  {discountApplied > 0 && (
                    <div className="flex justify-between items-center py-2.5 border-b border-[#f5f3f0]">
                      <span className="text-[13px] text-[#1e6b46]">Discount (10%)</span>
                      <span className="text-[13px] font-medium text-[#1e6b46]">
                        − Rs {discountApplied.toLocaleString()}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center pt-3.5 mt-1 border-t border-[#e8e5e0]">
                    <span className="text-sm font-semibold text-[#1a1a1a]">Total</span>
                    <span className="font-(family-name:--font-display) text-xl font-semibold text-[#1a1a1a]">
                      Rs {total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-[#e8e5e0] rounded-sm px-6 py-5 mb-4">
                <p className="text-[13px] font-medium text-[#333] mb-3">
                  If you have a discount code, please apply it below.
                </p>
                <div className="flex gap-2.5">
                  <input
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    placeholder="Discount code"
                    className="flex-1 px-3.5 py-2.5 border border-[#ddd] rounded-sm text-sm outline-none focus:border-(--color-gold)"
                  />
                  <button
                    onClick={applyDiscount}
                    className="px-5.5 py-2.5 bg-white text-(--color-gold) border border-(--color-gold) text-xs font-semibold uppercase tracking-wide rounded-sm hover:bg-(--color-gold) hover:text-white transition-colors whitespace-nowrap"
                  >
                    Apply
                  </button>
                </div>
              </div>

              <div className="bg-[#faf9f7] border border-[#e8e5e0] rounded-sm px-6 py-5 mb-4">
                <div className="flex items-center gap-2.5 px-4 py-3 bg-white border-[1.5px] border-(--color-gold) rounded-sm">
                  <input type="radio" checked readOnly className="w-3.75 h-3.75 accent-(--color-gold)" />
                  <span className="text-[13px] font-medium text-[#333]">Cash on delivery</span>
                </div>
                <p className="text-xs text-[#777] mt-2.5 leading-relaxed">Pay with cash upon delivery.</p>
              </div>

              <p className="text-xs text-[#888] leading-relaxed mb-4">
                Your personal data will be used to process your order, support your experience throughout this
                website, and for other purposes described in our{' '}
                <a href="#" className="text-(--color-gold) hover:underline">
                  privacy policy
                </a>
                .
              </p>

              <button
                onClick={placeOrder}
                className="w-full py-4 bg-(--color-gold) text-white text-sm font-semibold uppercase tracking-wide rounded-sm hover:bg-[#9a7220] transition-colors active:scale-[0.99]"
              >
                Place Order
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}