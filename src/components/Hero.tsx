import Link from "next/link";

export function Hero() {
  return (
    <section className="relative bg-hero-gradient min-h-[90vh] flex items-center overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/5 rounded-full" />
        <div className="absolute top-1/2 -left-20 w-72 h-72 bg-white/5 rounded-full" />
        <div className="absolute bottom-20 right-1/4 w-48 h-48 bg-white/5 rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
              <span className="text-white/90 text-sm font-medium">
                Fast & Trusted Lending
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              Personal Loans
              <br />
              <span className="text-primary-light">Made Simple</span>
            </h1>
            <p className="text-lg text-white/80 max-w-lg mb-8 leading-relaxed">
              Get funded in as little as 24 hours with competitive rates,
              transparent terms, and no hidden fees. Loans from{" "}
              <strong className="text-white">$2,000 to $10,000</strong>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/apply"
                className="inline-flex items-center justify-center bg-white text-primary-dark font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition-all hover:shadow-xl hover:-translate-y-0.5 text-lg"
              >
                Get Started
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
              <Link
                href="/how-it-works"
                className="inline-flex items-center justify-center glass text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/20 transition-all text-lg"
              >
                Learn More
              </Link>
            </div>
            <div className="flex items-center gap-6 mt-8 text-white/70 text-sm">
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-success"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                No hidden fees
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-success"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                No credit impact
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-success"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Fast funding
              </div>
            </div>
          </div>

          {/* Hero card */}
          <div className="hidden lg:block animate-slide-in-right">
            <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl p-8 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Loan Amount</p>
                    <p className="text-2xl font-bold text-dark">$10,000</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Interest Rate</span>
                    <span className="font-semibold text-dark">10% APR</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Term</span>
                    <span className="font-semibold text-dark">36 months</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Monthly Payment</span>
                    <span className="font-semibold text-primary text-lg">
                      $322.67/mo
                    </span>
                  </div>
                  <div className="h-px bg-gray-200 my-2" />
                  <div className="flex items-center justify-center gap-2 text-success text-sm font-medium ">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Pre-qualified &mdash; No credit impact
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-primary-50 rounded-2xl p-4 shadow-lg animate-float">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Funded in</p>
                    <p className="text-sm font-bold text-dark">24 Hours</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
