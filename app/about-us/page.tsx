export const metadata = {
  title: "About Us - House Of Fashion",
  description: "Learn more about House Of Fashion — a new brand bringing premium wedding and festive wear to customers online and in-store across Pakistan.",
};

export default function AboutUsPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <span className="text-xs font-semibold tracking-widest uppercase text-(--color-gold)">
        Our Story
      </span>

      <h1 className="font-(family-name:--font-display) text-4xl md:text-5xl font-semibold mt-3 mb-6 text-[#111]">
        About Us
      </h1>

      <div className="space-y-6 text-[#444] leading-relaxed">
        <p>
          House Of Fashion is a new name in Pakistan&apos;s clothing industry, built around a simple idea:
          everyone deserves to look and feel their best, whether it&apos;s a wedding, a festive occasion,
          or everyday wear.
        </p>

        <p>
          We bring together carefully curated collections of stitched and unstitched fabrics, wedding
          wear, and festive outfits — designed to suit a wide range of tastes and budgets. From premium
          embellished pieces to everyday essentials, our goal is to make quality fashion accessible to
          everyone.
        </p>

        <p>
          As a brand that operates both online and through our physical presence, House Of Fashion
          brings you the convenience of shopping from anywhere in Pakistan, while staying close to our
          customers through our on-ground store. Whether you visit us in person or shop through our
          website, we aim to give you the same standard of quality and service.
        </p>

        <p>
          We are just getting started, and we&apos;re excited to grow alongside our customers. Thank you
          for being part of our journey from day one.
        </p>
      </div>

      <div className="mt-12 border-t border-black/6 pt-8">
        <h2 className="text-lg font-semibold text-[#111] mb-3">
          Get in Touch
        </h2>
        <p className="text-sm text-[#444] leading-relaxed">
          Have questions about our products or want to know more about us?{" "}
          <a href="/contact-us" className="hover:text-(--color-gold) underline">
            Contact us
          </a>{" "}
          — we&apos;d love to hear from you.
        </p>
      </div>
    </main>
  );
}