export const metadata = {
  title: "Contact Us - House Of Fashion",
  description: "Have a question or need help? Reach out to House Of Fashion — we are happy to assist you.",
};

export default function ContactUsPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 text-center md:text-left">
      <span className="text-xs font-semibold tracking-widest uppercase text-(--color-gold)">
        Get in Touch
      </span>

      <h1 className="font-(family-name:--font-display) text-4xl md:text-5xl font-semibold mt-3 mb-6 text-[#111]">
        Contact Us
      </h1>

      <p className="text-[#444] leading-relaxed mb-10 max-w-xl mx-auto md:mx-0">
        Have a question or need help? Reach out to us at House Of Fashion — we are happy to assist you.
      </p>

      <div className="border border-black/10 rounded-2xl p-8 space-y-4 text-sm text-[#333] inline-block md:block text-left">
        <p>
          <strong className="text-[#111]">Address:</strong> We deliver to Islamabad, Abbottabad, and all across Pakistan.
        </p>
        <p>
          <strong className="text-[#111]">Email:</strong>{" "}
          <a
            href="mailto:houseoffashion9139809@gmail.com"
            className="hover:text-(--color-gold)"
          >
            houseoffashion9139809@gmail.com
          </a>
        </p>
        <p>
          <strong className="text-[#111]">Phone:</strong>{" "}
          <a href="tel:03175639776" className="hover:text-(--color-gold)">
            +92 (0317) 5639776
          </a>
        </p>
      </div>
    </main>
  );
}