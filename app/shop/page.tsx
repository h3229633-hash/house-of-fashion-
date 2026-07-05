'use client';
import { useState } from 'react';
import Header from '../../components/Header';
import CartDrawer from '../../components/CartDrawer';
import BannerSlider from '../../components/BannerSlider';
import NewArrivalsGrid from '../../components/NewArrivalsGrid';
import Footer from '../../components/Footer';

export default function ShopPage() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="bg-white">
      <Header onCartOpen={() => setCartOpen(true)} />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      <main className="pt-[100px]">
        <BannerSlider />

        <div className="px-4 md:px-8 py-10">
          <NewArrivalsGrid />
        </div>
      </main>

      <Footer />
    </div>
  );
}