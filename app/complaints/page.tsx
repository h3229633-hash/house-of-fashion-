export const metadata = {
  title: "Complaints - House Of Fashion",
  description: "Have a complaint about your order or our service? Let House Of Fashion know and we'll work to resolve it.",
};

export default function ComplaintsPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <span className="text-xs font-semibold tracking-widest uppercase text-(--color-gold)">
        We&apos;re Here to Help
      </span>

      <h1 className="font-(family-name:--font-display) text-4xl md:text-5xl font-semibold mt-3 mb-6 text-[#111]">
        Complaints
      </h1>

      <div className="space-y-6 text-[#444] leading-relaxed">
        <p>
          At House Of Fashion, customer satisfaction is important to us. If you are unhappy with a
          product, an order, or any part of your experience with us, please let us know — we take all
          complaints seriously and will do our best to resolve the issue promptly.
        </p>

        <p>
          To help us assist you as quickly as possible, please include the following details when you
          reach out:
        </p>

        <ul className="list-disc list-inside space-y-1.5 pl-2">
          <li>Your order number (if applicable)</li>
          <li>A clear description of the issue</li>
          <li>Photos of the product, if the complaint is about a damaged or incorrect item</li>
          <li>Your contact details (phone number or email)</li>
        </ul>

        <p>
          We aim to respond to all complaints within 2–3 business days. Once we review your complaint,
          we will get in touch to discuss the next steps, which may include a replacement, exchange, or
          refund depending on the nature of the issue.
        </p>
      </div>

      <div className="mt-12 border-t border-black/6 pt-8">
        <h2 className="text-lg font-semibold text-[#111] mb-3">
          Submit Your Complaint
        </h2>
        <div className="text-sm text-[#444] leading-relaxed space-y-1">
          <p>
            Email:{" "}
            <a
              href="mailto:houseoffashion9139809@gmail.com"
              className="hover:text-(--color-gold) underline"
            >
              houseoffashion9139809@gmail.com
            </a>
          </p>
          <p>
            Phone:{" "}
            <a href="tel:03175639776" className="hover:text-(--color-gold) underline">
              +92 (0317) 5639776
            </a>
          </p>
          <p>
            Or use our{" "}
            <a href="/contact-us" className="hover:text-(--color-gold) underline">
              Contact Us
            </a>{" "}
            page.
          </p>
        </div>
      </div>
    </main>
  );
}