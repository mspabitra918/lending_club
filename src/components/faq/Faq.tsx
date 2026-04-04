import { useState } from "react";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  const faqs = [
    {
      q: "What are the eligibility requirements?",
      a: "You must be at least 18 years old, a U.S. citizen or permanent resident, have a valid bank account, and meet our minimum income requirements. We consider a range of credit profiles.",
    },
    {
      q: "Will checking my rate affect my credit score?",
      a: "No. Checking your rate involves a soft credit pull, which does not affect your credit score. A hard inquiry only occurs if you accept a loan offer and proceed with the application.",
    },
    {
      q: "How quickly can I receive my funds?",
      a: "Once your loan is approved and you accept the terms, funds can be deposited directly into your bank account in as little as 24 hours (1 business day).",
    },
    {
      q: "What can I use the loan for?",
      a: "Our personal loans can be used for a variety of purposes including debt consolidation, home improvement, medical expenses, major purchases, education, and more.",
    },
    {
      q: "Are there any prepayment penalties?",
      a: "No. You can pay off your loan early at any time without any prepayment penalties or additional fees.",
    },
    {
      q: "What interest rates do you offer?",
      a: "Our rates start as low as 5.99% APR depending on your credit profile, income, and other factors. All rates are fixed for the life of the loan.",
    },
  ];

  return (
    <section id="faq" className="py-24 bg-gray-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-dark mt-2">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 mt-3">
            Find answers to common questions about our loans.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white rounded-xl overflow-hidden shadow-sm"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-dark pr-4">{faq.q}</span>
                <svg
                  className={`w-5 h-5 text-primary shrink-0 transition-transform duration-300 ${
                    open === i ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  open === i ? "max-h-48 pb-6" : "max-h-0"
                }`}
              >
                <p className="px-6 text-gray-500 text-sm leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
