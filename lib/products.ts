export type Product = {
  id: number;
  name: string;
  price: number;
  original: number | null;
  img: string;
  badge: 'Sale' | 'New' | null;
  discount: string | null;
  desc: string;
};

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Chiffon Embroidered Hand Embellished Luxury 3PC',
    price: 8100,
    original: 10000,
    img: '/products/product-1.jpeg',
    badge: 'Sale',
    discount: '19% Off',
    desc: 'Premium chiffon with hand embellishment. 3PC (Shirt + Trouser + Dupatta). Perfect for festive occasions.',
  },
  {
    id: 2,
    name: 'Bridal Wedding Collection — Red Embroidered',
    price: 24500,
    original: null,
    img: '/products/product-2.jpeg',
    badge: 'New',
    discount: null,
    desc: 'Stunning bridal red embroidered collection. Crafted for your special day with intricate detail work.',
  },
  {
    id: 3,
    name: 'Sky Blue Chiffon Embroidered Suit with Dupatta',
    price: 6800,
    original: null,
    img: '/products/product-3.jpeg',
    badge: null,
    discount: null,
    desc: 'Elegant sky blue chiffon suit with matching embroidered dupatta. Ideal for semi-formal occasions.',
  },
  {
    id: 4,
    name: 'Teal Kurta with Printed Trouser — Pret',
    price: 4250,
    original: 5000,
    img: '/products/product-4.jpeg',
    badge: 'Sale',
    discount: '15% Off',
    desc: 'Stylish teal pret kurta paired with printed trouser. Comfortable everyday wear with a fashionable look.',
  },
  {
    id: 5,
    name: 'Lawn Unstitched 3PC Premium Embroidered',
    price: 3500,
    original: null,
    img: '/products/product-5.jpeg',
    badge: null,
    discount: null,
    desc: 'Premium lawn unstitched 3PC with embroidered front. High quality fabric for comfortable summer wear.',
  },
  {
    id: 6,
    name: 'Festive Wear Embroidered Net 2PC Suit',
    price: 7200,
    original: 9000,
    img: '/products/product-6.jpeg',
    badge: null,
    discount: '20% Off',
    desc: 'Gorgeous festive wear net suit with heavy embroidery. 2PC ready to wear for parties and celebrations.',
  },
  {
    id: 7,
    name: 'Khaddar Winter 3PC — Embroidered Premium',
    price: 5400,
    original: null,
    img: '/products/product-7.jpeg',
    badge: 'Sale',
    discount: null,
    desc: 'Warm khaddar 3PC winter collection with premium embroidery. Stay cozy and stylish this winter season.',
  },
  {
    id: 8,
    name: 'Best Seller — Georgette Embroidered Outfit',
    price: 9800,
    original: null,
    img: '/products/product-1.jpeg',
    badge: 'New',
    discount: null,
    desc: 'Our best-selling georgette embroidered outfit. Flowing fabric with delicate threadwork — a crowd favourite.',
  },
  {
    id: 9,
    name: 'Summer Sale — Lawn Printed 2PC Set',
    price: 2100,
    original: 4200,
    img: '/products/product-2.jpeg',
    badge: 'Sale',
    discount: '50% Off',
    desc: 'Fresh lawn printed 2PC set at 50% off. Light, breathable fabric perfect for hot summer days.',
  },
  {
    id: 10,
    name: 'MUSHO Premium Wedding Collection',
    price: 18000,
    original: null,
    img: '/products/product-3.jpeg',
    badge: null,
    discount: null,
    desc: 'MUSHO luxury wedding collection — crafted for brides who want to make a lasting impression.',
  },
];

export function getProductById(id: number): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}