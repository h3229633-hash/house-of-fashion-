'use client';
import { useState } from 'react';
import Header from '../components/Header';
import CartDrawer from '../components/CartDrawer';
import BannerSlider from '../components/BannerSlider';
import ProductGrid from '../components/ProductGrid';
import BlogSection from '../components/BlogSection';
import Footer from '../components/Footer';

export default function Home() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="bg-white">
      <Header onCartOpen={() => setCartOpen(true)} />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      <main className="pt-[100px]">
        <BannerSlider />
        <ProductGrid />
        <BlogSection />
      </main>

      <Footer />
    </div>
  );
}