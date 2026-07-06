export const metadata = {
  title: "Exchange Policy - House Of Fashion",
  description: "Learn about House Of Fashion's exchange policy, including eligibility, timeframes, and how to request an exchange.",
};

export default function ExchangePolicyPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <span className="text-xs font-semibold tracking-widest uppercase text-(--color-gold)">
        Help Center
      </span>

      <h1 className="font-(family-name:--font-display) text-4xl md:text-5xl font-semibold mt-3 mb-6 text-[#111]">
        Exchange Policy
      </h1>

      <div className="space-y-8">
        <div>
          <h2 className="text-lg font-semibold text-[#111] mb-2">
            Eligibility
          </h2>
          <p className="text-sm text-[#444] leading-relaxed">
            We accept exchange requests within 3 days of delivery, provided the item is unused, unwashed,
            and in its original condition with all tags attached. Items purchased on sale or marked as
            &quot;final sale&quot; are not eligible for exchange.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-[#111] mb-2">
            How to Request an Exchange
          </h2>
          <p className="text-sm text-[#444] leading-relaxed">
            To request an exchange, please contact us with your order number, the item you&apos;d like to
            exchange, and the reason for the exchange (e.g. size issue, defect). You can reach us through
            our{" "}
            <a href="/contact-us" className="hover:text-(--color-gold) underline">
              Contact Us
            </a>{" "}
            page, email, or phone.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-[#111] mb-2">
            Exchange Process
          </h2>
          <p className="text-sm text-[#444] leading-relaxed">
            Once your exchange request is approved, you will be guided on how to send the item back to
            us. After we receive and inspect the returned item, we will process your exchange for a
            different size or color, subject to availability.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-[#111] mb-2">
            Damaged or Incorrect Items
          </h2>
          <p className="text-sm text-[#444] leading-relaxed">
            If you receive a damaged, defective, or incorrect item, please contact us within 3 days of
            delivery along with photos of the item. We will arrange a replacement or exchange at no
            additional cost to you.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-[#111] mb-2">
            Shipping Costs
          </h2>
          <p className="text-sm text-[#444] leading-relaxed">
            Customers are responsible for return shipping costs in cases of size or preference-based
            exchanges. For damaged, defective, or incorrect items, House Of Fashion will cover the
            shipping cost.
          </p>
        </div>
      </div>

      <div className="mt-12 border-t border-black/6 pt-8">
        <h2 className="text-lg font-semibold text-[#111] mb-3">
          Need Help?
        </h2>
        <p className="text-sm text-[#444] leading-relaxed">
          If you have any questions about an exchange, feel free to{" "}
          <a href="/contact-us" className="hover:text-(--color-gold) underline">
            contact us
          </a>{" "}
          — we&apos;re happy to help.
        </p>
      </div>
    </main>
  );
}