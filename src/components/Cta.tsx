import Link from "next/link";

export function CTABanner() {
  return (
    <section className="py-20 bg-cta-gradient">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
          Take Control of Your Finances Today
        </h2>
        <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
          Join thousands of satisfied borrowers who chose Lending Club for their
          personal loan needs. Apply now with no impact on your credit score.
        </p>
        <Link
          href="/apply"
          className="inline-flex items-center bg-white text-primary-dark font-bold px-10 py-4 rounded-xl hover:bg-gray-100 transition-all hover:shadow-xl hover:-translate-y-0.5 text-lg"
        >
          Get Started Now
          <svg
            className="w-5 h-5 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </Link>
        <p className="text-white/60 text-sm mt-4">
          No hidden fees &bull; Rates from 10% APR &bull; Funding in 24 hours
        </p>
      </div>
    </section>
  );
}
