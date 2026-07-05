import Image from 'next/image';

const PRODUCTS = [
  { id: 1, name: 'Embellished Wedding Anarkali', price: 'Rs 24,500', img: '/products/product-1.jpeg' },
  { id: 2, name: 'Emerald Kurta with Heart Trousers', price: 'Rs 6,900', img: '/products/product-2.jpeg' },
  { id: 3, name: 'Sage Embroidered Bridal Set', price: 'Rs 32,000', img: '/products/product-3.jpeg' },
  { id: 4, name: 'Navy Floral Printed Suit', price: 'Rs 8,400', img: '/products/product-4.jpeg' },
  { id: 5, name: 'Mint Chiffon Embellished Set', price: 'Rs 27,800', img: '/products/product-5.jpeg' },
  { id: 6, name: 'Rose Pink Embroidered Suit', price: 'Rs 12,200', img: '/products/product-6.jpeg' },
  { id: 7, name: 'Ivory Floral Printed Kurta', price: 'Rs 7,500', img: '/products/product-7.jpeg' },
];

export default function ProductGrid() {
  return (
    <section className="px-4 md:px-8 py-12 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <span className="block text-xs tracking-[0.2em] uppercase text-(--color-accent) mb-2">
          Latest Collection
        </span>
        <h2 className="font-(family-name:--font-display) text-3xl md:text-4xl font-normal">
          Featured Products
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {PRODUCTS.map((product) => (
          <div key={product.id} className="group cursor-pointer">
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
              <Image
                src={product.img}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            <div className="pt-3">
              <h3 className="text-sm font-medium text-[#222] line-clamp-1">{product.name}</h3>
              <p className="text-sm text-(--color-accent) mt-1">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
