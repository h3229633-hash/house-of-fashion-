'use client';
import Image from 'next/image';
import Link from 'next/link';
import { PRODUCTS } from '../lib/products';

export default function NewArrivalsGrid() {
  return (
    <section className="max-w-[1300px] mx-auto">
      <h2 className="font-(family-name:--font-display) text-2xl font-semibold text-[#222] tracking-wide mb-6">
        New Arrivals
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {PRODUCTS.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="group bg-white border border-[#e0ddd8] cursor-pointer transition-all duration-250 hover:shadow-lg hover:-translate-y-1 block"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-[#f8f7f5]">
              <Image
                src={product.img}
                alt={product.name}
                fill
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />

              {(product.badge || product.discount) && (
                <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-[2]">
                  {product.badge && (
                    <span
                      className={`inline-block px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide rounded-sm ${
                        product.badge === 'Sale' ? 'bg-[#111] text-white' : 'bg-[#1e6b46] text-white'
                      }`}
                    >
                      {product.badge}
                    </span>
                  )}
                  {product.discount && (
                    <span className="inline-block px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide rounded-sm bg-(--color-gold) text-white">
                      {product.discount}
                    </span>
                  )}
                </div>
              )}

              <div className="absolute inset-0 bg-black/28 flex items-end justify-center pb-4.5 opacity-0 group-hover:opacity-100 transition-opacity duration-250 z-[3]">
                <span className="bg-white text-[#111] px-5.5 py-2.5 text-xs font-semibold uppercase tracking-wide rounded-sm hover:bg-(--color-gold) hover:text-white transition-colors">
                  Quick View
                </span>
              </div>
            </div>

            <div className="px-3.5 pt-3 pb-4">
              <div className="text-[13px] text-[#333] leading-relaxed mb-2 line-clamp-2">
                {product.name}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-[#222]">Rs {product.price.toLocaleString()}</span>
                {product.original && (
                  <span className="text-xs text-[#aaa] line-through">Rs {product.original.toLocaleString()}</span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
