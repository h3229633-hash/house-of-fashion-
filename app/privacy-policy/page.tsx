export const metadata = {
  title: "Privacy Policy - House Of Fashion",
  description: "Learn how House Of Fashion collects, uses, and protects your personal information.",
};

const SECTIONS = [
  {
    title: "1. Information We Collect",
    body: "When you use our website or place an order, we may collect personal information such as your name, email address, phone number, shipping address, and payment details necessary to process your order.",
  },
  {
    title: "2. How We Use Your Information",
    body: "We use the information you provide to process and deliver your orders, communicate with you about your purchases, respond to inquiries, and improve our products and services. We do not sell your personal information to third parties.",
  },
  {
    title: "3. Payment Information",
    body: "Payment details provided during checkout are used solely to process your order and are handled securely. We do not store your full payment card details on our servers.",
  },
  {
    title: "4. Sharing of Information",
    body: "We may share your information with trusted third parties such as courier services, solely for the purpose of fulfilling and delivering your order. We do not share your information with third parties for marketing purposes without your consent.",
  },
  {
    title: "5. Cookies",
    body: "Our website may use cookies to improve your browsing experience, remember your preferences, and understand how visitors use our site. You can choose to disable cookies through your browser settings, though this may affect certain website features.",
  },
  {
    title: "6. Data Security",
    body: "We take reasonable measures to protect your personal information from unauthorized access, loss, or misuse. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.",
  },
  {
    title: "7. Your Rights",
    body: "You have the right to request access to, correction of, or deletion of your personal information held by us. To make such a request, please contact us using the details below.",
  },
  {
    title: "8. Changes to This Policy",
    body: "We may update this Privacy Policy from time to time. Any changes will be posted on this page, and continued use of our website after changes constitutes acceptance of the updated policy.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <span className="text-xs font-semibold tracking-widest uppercase text-(--color-gold)">
        Legal
      </span>

      <h1 className="font-(family-name:--font-display) text-4xl md:text-5xl font-semibold mt-3 mb-6 text-[#111]">
        Privacy Policy
      </h1>

      <p className="text-[#444] leading-relaxed mb-10">
        At House Of Fashion, we respect your privacy and are committed to protecting your personal
        information. This Privacy Policy explains how we collect, use, and safeguard your data when you
        visit our website or make a purchase.
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
        Last updated: 2026. If you have any questions about this Privacy Policy, please{" "}
        <a href="/contact-us" className="hover:text-(--color-gold) underline">
          contact us
        </a>.
      </p>
    </main>
  );
}