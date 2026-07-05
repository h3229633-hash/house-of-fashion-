'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../../../components/Header';
import CartDrawer from '../../../components/CartDrawer';
import Footer from '../../../components/Footer';
import { PRODUCTS, getProductById } from '../../../lib/products';

const SIZES = ['XS', 'S', 'M', 'L', 'XL'];
const COLORS = [
  { name: 'Beige Gold', hex: '#c8a97a' },
  { name: 'Steel Blue', hex: '#7a9cbf' },
  { name: 'Rust', hex: '#b5754a' },
  { name: 'Sage Green', hex: '#4a7a5a' },
  { name: 'Black', hex: '#2a2a2a' },
];

type AccordionKey = 'description' | 'fabric' | 'shipping';

export default function ProductDetailPage() {
  const params = useParams();
  const id = parseInt(params.id as string, 10) || 1;
  const product = getProductById(id) || PRODUCTS[0];

  const [cartOpen, setCartOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState('S');
  const [selectedColor, setSelectedColor] = useState(0);
  const [qty, setQty] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<AccordionKey>('description');
  const [notice, setNotice] = useState('');
  const [wishlisted, setWishlisted] = useState(false);

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  function addItemToLocalCart() {
    const cart = JSON.parse(localStorage.getItem('hof_cart') || '[]');
    cart.push({
      id: `p${product.id}`,
      name: product.name,
      price: product.price,
      img: product.img,
      size: selectedSize,
      qty,
    });
    localStorage.setItem('hof_cart', JSON.stringify(cart));
  }

  function addToCart() {
    addItemToLocalCart();
    setNotice(`"${product.name}" has been added to your cart.`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function buyNow() {
    addItemToLocalCart();
    window.location.href = '/checkout';
  }

  function changeQty(delta: number) {
    setQty((prev) => Math.min(10, Math.max(1, prev + delta)));
  }

  return (
    <div className="bg-white">
      <Header onCartOpen={() => setCartOpen(true)} />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      <div className="pt-[100px]">
        {/* Breadcrumb */}
        <nav className="px-6 max-w-[1300px] mx-auto py-3.5 text-xs text-[#999] flex gap-1.5 items-center flex-wrap">
          <Link href="/" className="text-[#888] hover:text-(--color-gold)">Home</Link>
          <span className="text-[#ccc]">/</span>
          <Link href="/shop" className="text-[#888] hover:text-(--color-gold)">New Arrivals</Link>
          <span className="text-[#ccc]">/</span>
          <span className="text-[#444]">{product.name}</span>
        </nav>

        {/* Added to cart notice */}
        {notice && (
          <div className="flex items-center justify-between gap-3 flex-wrap bg-[#f5f3f0] border border-[#e0ddd8] px-6 py-3.5 max-w-[1300px] mx-auto mb-2 text-[13px] text-[#444]">
            <span className="italic">{notice}</span>
            <div className="flex gap-2.5 flex-shrink-0">
              <button
                onClick={() => setNotice('')}
                className="px-5.5 py-2 border border-[#ccc] text-xs font-semibold uppercase tracking-wide rounded-sm hover:bg-[#111] hover:text-white hover:border-[#111] transition-colors"
              >
                ✕ Continue Shopping
              </button>
              <Link
                href="/checkout"
                className="px-5.5 py-2 bg-(--color-gold) text-white text-xs font-semibold uppercase tracking-wide rounded-sm hover:bg-(--color-accent) transition-colors"
              >
                View Cart →
              </Link>
            </div>
          </div>
        )}

        {/* Product Page */}
        <div className="max-w-[1300px] mx-auto px-6 pb-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-start">
          {/* Gallery */}
          <div className="md:sticky md:top-[110px]">
            <div className="relative aspect-[3/4] bg-[#f8f7f5] border border-[#e8e5e0] overflow-hidden cursor-zoom-in group">
              <Image
                src={product.img}
                alt={product.name}
                fill
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5 z-[2]">
                {product.badge && (
                  <span
                    className={`inline-block px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide rounded-sm ${
                      product.badge === 'Sale' ? 'bg-[#111] text-white' : 'bg-[#1e6b46] text-white'
                    }`}
                  >
                    {product.badge}
                  </span>
                )}
                {product.discount && (
                  <span className="inline-block px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide rounded-sm bg-(--color-gold) text-white">
                    {product.discount}
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-2 mt-2.5 flex-wrap">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`relative w-[72px] h-[90px] overflow-hidden bg-[#f8f7f5] cursor-pointer border-2 flex-shrink-0 ${
                    i === 0 ? 'border-(--color-gold)' : 'border-transparent'
                  }`}
                >
                  <Image src={product.img} alt={`View ${i + 1}`} fill className="object-cover object-top" />
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="pt-2">
            <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-(--color-gold) mb-2.5">
              House Of Fashion
            </div>
            <h1 className="font-(family-name:--font-display) text-2xl md:text-[30px] font-semibold text-[#1a1a1a] leading-tight mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-2 mb-5">
              <div className="flex gap-0.5 text-(--color-gold) text-sm">
                <span>★</span><span>★</span><span>★</span><span>★</span><span className="text-[#ddd]">★</span>
              </div>
              <span className="text-xs text-[#999]">(42 reviews)</span>
            </div>

            <div className="mb-6">
              <span className="font-(family-name:--font-display) text-2xl font-semibold text-[#1a1a1a]">
                Rs {product.price.toLocaleString()}
              </span>
              {product.original && (
                <>
                  <span className="text-[15px] text-[#aaa] line-through ml-2.5">
                    Rs {product.original.toLocaleString()}
                  </span>
                  <span className="inline-block bg-[#fff4e0] text-(--color-gold) text-[11px] font-semibold px-2.5 py-1 rounded-sm ml-2.5">
                    Save Rs {(product.original - product.price).toLocaleString()}
                  </span>
                </>
              )}
            </div>

            <hr className="border-[#e8e5e0] my-5.5" />

            <div className="text-xs font-semibold uppercase tracking-wide text-[#555] mb-2.5">Size</div>
            <div className="flex gap-2 flex-wrap mb-5">
              {SIZES.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-12 h-9.5 px-3.5 border text-xs font-medium rounded-sm transition-all ${
                    selectedSize === size
                      ? 'border-[#111] bg-[#111] text-white'
                      : 'border-[#ddd] text-[#444] hover:border-(--color-gold) hover:text-(--color-gold)'
                  }`}
                >
                  {size}
                </button>
              ))}
              <button disabled className="min-w-12 h-9.5 px-3.5 border border-[#ddd] text-xs font-medium rounded-sm opacity-40 line-through cursor-not-allowed">
                XXL
              </button>
            </div>

            <div className="text-xs font-semibold uppercase tracking-wide text-[#555] mb-2.5">Color</div>
            <div className="flex gap-2.5 flex-wrap mb-5">
              {COLORS.map((color, i) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(i)}
                  title={color.name}
                  style={{ backgroundColor: color.hex }}
                  className={`w-7.5 h-7.5 rounded-full border-2 shadow-sm transition-transform hover:scale-110 ${
                    selectedColor === i ? 'border-[#111] scale-110' : 'border-transparent'
                  }`}
                />
              ))}
            </div>

            <div className="text-xs font-semibold uppercase tracking-wide text-[#555] mb-2.5">Quantity</div>
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center border border-[#ddd] rounded-sm overflow-hidden">
                <button onClick={() => changeQty(-1)} className="w-9.5 h-10.5 bg-[#f7f6f4] hover:bg-[#111] hover:text-white transition-colors flex items-center justify-center text-lg">
                  −
                </button>
                <span className="w-13 h-10.5 flex items-center justify-center text-sm font-medium border-x border-[#ddd]">
                  {qty}
                </span>
                <button onClick={() => changeQty(1)} className="w-9.5 h-10.5 bg-[#f7f6f4] hover:bg-[#111] hover:text-white transition-colors flex items-center justify-center text-lg">
                  +
                </button>
              </div>
              <span className="text-xs text-[#999]">Only 6 left in stock</span>
            </div>

            <div className="flex flex-col gap-2.5 mb-6">
              <button
                onClick={addToCart}
                className="w-full py-4 bg-[#111] text-white border-[1.5px] border-[#111] text-[13px] font-semibold uppercase tracking-wide rounded-sm hover:bg-(--color-gold) hover:border-(--color-gold) transition-colors flex items-center justify-center gap-2"
              >
                🛍 Add to Cart
              </button>
              <button
                onClick={buyNow}
                className="w-full py-4 bg-white text-[#111] border-[1.5px] border-[#111] text-[13px] font-semibold uppercase tracking-wide rounded-sm hover:bg-(--color-gold) hover:border-(--color-gold) hover:text-white transition-colors flex items-center justify-center gap-2"
              >
                → Buy Now
              </button>
            </div>

            <button
              onClick={() => setWishlisted(!wishlisted)}
              className={`flex items-center gap-1.5 text-xs mb-6 transition-colors ${
                wishlisted ? 'text-[#c0392b]' : 'text-[#888] hover:text-[#c0392b]'
              }`}
            >
              {wishlisted ? '♥ Wishlisted' : '♡ Add to Wishlist'}
            </button>

            <div className="flex border border-[#e8e5e0] rounded mb-7 overflow-hidden">
              {[
                { label: 'Secure Payment' },
                { label: 'Fast Delivery' },
                { label: 'Easy Returns' },
                { label: 'Authentic Products' },
              ].map((badge, i) => (
                <div key={i} className="flex-1 px-2 py-3 flex flex-col items-center gap-1.5 border-r border-[#e8e5e0] last:border-r-0 bg-[#fdfcfa]">
                  <span className="text-(--color-gold) text-lg">✓</span>
                  <span className="text-[10px] font-medium text-[#666] text-center leading-tight">{badge.label}</span>
                </div>
              ))}
            </div>

            {/* Accordions */}
            {(
              [
                { key: 'description', label: 'Description', content: <p>{product.desc}</p> },
                {
                  key: 'fabric',
                  label: 'Fabric & Care',
                  content: (
                    <ul className="list-disc pl-4.5 space-y-1">
                      <li>Dry clean recommended</li>
                      <li>Do not bleach</li>
                      <li>Iron on low heat only</li>
                      <li>Store in a cool, dry place</li>
                    </ul>
                  ),
                },
                {
                  key: 'shipping',
                  label: 'Shipping & Returns',
                  content: (
                    <p>
                      Orders dispatched within 2–3 business days. Delivery 3–5 working days across Pakistan. Exchange
                      within 7 days — item must be unused and in original packaging.
                    </p>
                  ),
                },
              ] as { key: AccordionKey; label: string; content: React.ReactNode }[]
            ).map((item) => (
              <div key={item.key} className="border-t border-[#e8e5e0] last:border-b last:border-[#e8e5e0]">
                <button
                  onClick={() => setOpenAccordion(openAccordion === item.key ? ('' as AccordionKey) : item.key)}
                  className="w-full flex items-center justify-between py-4 text-xs font-semibold uppercase tracking-wide text-[#333] hover:text-(--color-gold) transition-colors"
                >
                  {item.label}
                  <span className={`text-xl font-light text-[#aaa] transition-transform ${openAccordion === item.key ? 'rotate-45' : ''}`}>
                    +
                  </span>
                </button>
                {openAccordion === item.key && (
                  <div className="text-[13px] text-[#666] leading-relaxed pb-4.5">{item.content}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Related Products */}
        <section className="max-w-[1300px] mx-auto px-6 pb-14">
          <h2 className="font-(family-name:--font-display) text-2xl font-semibold text-[#222] tracking-wide mb-6 pt-10 border-t border-[#e8e5e0]">
            You May Also Like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((rp) => (
              <Link
                key={rp.id}
                href={`/product/${rp.id}`}
                className="group bg-white border border-[#e0ddd8] cursor-pointer transition-all duration-250 hover:shadow-lg hover:-translate-y-1 block"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-[#f8f7f5]">
                  <Image
                    src={rp.img}
                    alt={rp.name}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/28 flex items-end justify-center pb-4.5 opacity-0 group-hover:opacity-100 transition-opacity duration-250">
                    <span className="bg-white text-[#111] px-5.5 py-2.5 text-xs font-semibold uppercase tracking-wide rounded-sm">
                      Quick View
                    </span>
                  </div>
                </div>
                <div className="px-3.5 pt-3 pb-4">
                  <div className="text-[13px] text-[#333] leading-relaxed mb-2 line-clamp-2">{rp.name}</div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-[#222]">Rs {rp.price.toLocaleString()}</span>
                    {rp.original && (
                      <span className="text-xs text-[#aaa] line-through">Rs {rp.original.toLocaleString()}</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}