export const metadata = {
  title: "Terms and Conditions - House Of Fashion",
  description: "Please read these terms and conditions carefully before using House Of Fashion's website and services.",
};

const SECTIONS = [
  {
    title: "1. Introduction",
    body: "Welcome to House Of Fashion. By accessing or using our website, placing an order, or purchasing any of our products, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our website.",
  },
  {
    title: "2. Orders",
    body: "All orders placed through our website are subject to product availability and confirmation of the order price. We reserve the right to refuse or cancel any order at our discretion, including in cases of pricing errors, stock unavailability, or suspected fraudulent activity.",
  },
  {
    title: "3. Pricing",
    body: "All prices listed on our website are in Pakistani Rupees (PKR) and are subject to change without prior notice. We make every effort to ensure prices are accurate, but errors may occasionally occur.",
  },
  {
    title: "4. Payment",
    body: "We accept payment through the methods listed at checkout, which may include cash on delivery, bank transfer, or online payment options. Full payment (or applicable advance) must be received before an order is processed and shipped.",
  },
  {
    title: "5. Shipping & Delivery",
    body: "We aim to deliver orders within the estimated timeframe provided at checkout. Delivery times may vary depending on your location within Pakistan and are not guaranteed. House Of Fashion is not responsible for delays caused by courier services or circumstances beyond our control.",
  },
  {
    title: "6. Returns & Exchange",
    body: "Returns and exchanges are handled according to our Exchange Policy, available on our website. Please review that policy for eligibility, timeframes, and conditions that apply to returned or exchanged items.",
  },
  {
    title: "7. Product Images",
    body: "We strive to display our products as accurately as possible. However, actual colors and details may vary slightly from what is shown on your screen due to differences in lighting, photography, and display settings.",
  },
  {
    title: "8. Intellectual Property",
    body: "All content on this website, including images, text, logos, and designs, is the property of House Of Fashion and may not be copied, reproduced, or used without our prior written consent.",
  },
  {
    title: "9. Limitation of Liability",
    body: "House Of Fashion shall not be held liable for any indirect, incidental, or consequential damages arising from the use of our website or products, to the fullest extent permitted by law.",
  },
  {
    title: "10. Changes to Terms",
    body: "We reserve the right to update or modify these Terms and Conditions at any time without prior notice. Continued use of our website after any changes constitutes your acceptance of the revised terms.",
  },
];

export default function TermsAndConditionsPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <span className="text-xs font-semibold tracking-widest uppercase text-(--color-gold)">
        Legal
      </span>

      <h1 className="font-(family-name:--font-display) text-4xl md:text-5xl font-semibold mt-3 mb-6 text-[#111]">
        Terms and Conditions
      </h1>

      <p className="text-[#444] leading-relaxed mb-10">
        Please read these terms and conditions carefully before using the House Of Fashion website or purchasing any of our products.
      </p>

      <div className="space-y-8">
        {SECTIONS.map((section) => (
          <div key={section.title}>
            <h2 className="text-lg font-semibold text-[#111] mb-2">
              {section.title}
            </h2>
            <p className="text-sm text-[#444] leading-relaxed">
              {section.body}
            </p>
          </div>
        ))}
      </div>

      <p className="text-xs text-[#999] mt-12 border-t border-black/6 pt-6">
        Last updated: 2026. If you have any questions about these terms, please{" "}
        <a href="/contact-us" className="hover:text-(--color-gold) underline">
          contact us
        </a>.
      </p>
    </main>
  );
}