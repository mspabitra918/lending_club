import Link from "next/link";

export function Contact() {
  return (
    <section id="contact" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid lg:grid-cols-2">
            <div className="bg-cta-gradient p-10 lg:p-14 text-white">
              <h2 className="text-3xl font-extrabold mb-4">Get in Touch</h2>
              <p className="text-white/80 mb-10">
                Have questions? Our team is here to help you find the right loan
                solution.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-white/70 text-sm">
                      support@lendingclubs.pro
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p className="text-white/70 text-sm">(773) 236-7585</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold">Working Hours</p>
                    <p className="text-white/70 text-sm">
                      Mon–Fri: 8 AM – 5 PM PST
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-10 lg:p-14 flex items-center">
              <div className="w-full text-center">
                <h3 className="text-2xl font-bold text-dark mb-3">
                  Ready to Get Started?
                </h3>
                <p className="text-gray-500 mb-8">
                  Apply now and get a decision in minutes. No obligation, no
                  credit impact.
                </p>
                <Link
                  href="/apply"
                  className="inline-flex items-center bg-primary hover:bg-primary-dark text-white font-bold px-10 py-4 rounded-xl transition-all hover:shadow-xl hover:-translate-y-0.5 text-lg"
                >
                  Apply Now
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
                <p className="text-gray-400 text-xs mt-4">
                  256-bit SSL encryption &bull; No upfront fees &bull; No credit
                  impact
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
