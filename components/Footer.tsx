import Link from 'next/link';
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
const CATEGORIES = [
  { label: 'Stiched', href: '/stiched' },
  { label: 'Unstiched', href: '/unstiched' },
  { label: 'Pret', href: '/pret' },
  { label: 'Wedding', href: '/wedding' },
  { label: '2PC', href: '/2pc' },
  { label: '3PC', href: '/3pc' },
  { label: 'Summer Sale', href: '/summer-sale' },
  { label: 'Winter Sale', href: '/winter-sale' },
  { label: '50% Discount', href: '/discount' },
  { label: 'Festive Wear', href: '/festive-wear' },
  { label: 'New Arrival', href: '/new-arrival' },
  { label: 'Best Sellers', href: '/best-sellers' },
  { label: 'Contact Us', href: '/contact-us' },
];

const SOCIALS = [
  { name: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61590552932423', icon: FaFacebook },
  { name: 'Instagram', href: 'https://www.instagram.com/houseoffashion5639776/', icon: FaInstagram },
  { name: 'Twitter', href: 'https://x.com/housefashion563', icon: FaTwitter },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-black/8 px-6 pt-10 pb-6">
      <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1.2fr_1fr_1.2fr] gap-8 md:gap-10 max-w-6xl mx-auto mb-8 text-center md:text-left">
        <div className="flex flex-col items-center md:items-start gap-4">
          <Link href="/" className="flex items-center gap-2 text-[#111]">
            <span className="relative flex items-center justify-center w-10.5 h-10.5">
              <span className="absolute -top-0.5 text-xs text-(--color-gold)">Crown</span>
              <span className="font-(family-name:--font-display) text-lg font-semibold text-(--color-gold)">HF</span>
            </span>
            <span className="text-xs font-semibold tracking-widest uppercase">House Of Fashion</span>
          </Link>

          <div className="text-sm text-[#333] leading-relaxed">
            <p>Email: <a href="mailto:houseoffashion9139809@gmail.com" className="hover:text-(--color-gold)">houseoffashion9139809@gmail.com</a></p>
            <p>Call: <a href="tel:03175639776" className="hover:text-(--color-gold)">03175639776</a></p>
          </div>

          <div className="flex gap-2.5">
            {SOCIALS.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-8 h-8 rounded-full border border-[#111] flex items-center justify-center hover:bg-[#111] hover:text-white transition-colors"
                >
                  <Icon size={24} />
                </a>
              );
            })}
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold tracking-widest uppercase mb-4">Useful Links</h4>
          <ul className="space-y-1.5 text-sm text-[#444]">
            <li><a href="#" className="hover:text-(--color-gold)">About Us</a></li>
            <li><Link href="/contact-us" className="hover:text-(--color-gold)">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold tracking-widest uppercase mb-4">Customer Policies</h4>
          <ul className="space-y-1.5 text-sm text-[#444]">
            <li><a href="#" className="hover:text-(--color-gold)">Complaints</a></li>
            <li><a href="#" className="hover:text-(--color-gold)">Terms and Conditions</a></li>
            <li><a href="#" className="hover:text-(--color-gold)">Privacy Policy</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold tracking-widest uppercase mb-4">Help Center</h4>
          <ul className="space-y-1.5 text-sm text-[#444]">
            <li><a href="#" className="hover:text-(--color-gold)">Exchange Policy</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold tracking-widest uppercase mb-4">Categories</h4>
          <ul className="space-y-1.5 text-sm text-[#444]">
            {CATEGORIES.map((cat) => (
              <li key={cat.href}>
                <Link href={cat.href} className="hover:text-(--color-gold)">{cat.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="text-center text-xs text-[#666] pt-6 border-t border-black/6 leading-relaxed">
        <p>Copyright 2026 House Of Fashion</p>
        <p className="text-[0.7rem] text-[#999]">Design by webseo.com.pk</p>
      </div>
    </footer>
  );
}