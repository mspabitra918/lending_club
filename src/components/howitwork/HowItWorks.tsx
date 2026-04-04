export function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Check Your Rate",
      desc: "Fill out our simple 5-minute application. Checking your rate won't affect your credit score.",
      icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
    },
    {
      num: "02",
      title: "Review Your Offer",
      desc: "Receive a personalized loan offer with your rate, term, and monthly payment details.",
      icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    },
    {
      num: "03",
      title: "Get Your Funds",
      desc: "Once approved, your funds are deposited directly into your bank account in as little as 24 hours.",
      icon: "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z",
    },
  ];

  return (
    <section id="how-it-works" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-dark mt-2">
            Get Funded in 3 Simple Steps
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Our streamlined process gets you from application to funding quickly
            and easily.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative text-center group">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-gray-200">
                  <div className="absolute inset-0 bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                </div>
              )}
              <div className="relative z-10 w-32 h-32 mx-auto mb-6 bg-primary-50 rounded-full flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                <svg
                  className="w-12 h-12 text-primary group-hover:text-white transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d={step.icon}
                  />
                </svg>
                <span className="absolute -top-2 -right-2 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                  {step.num}
                </span>
              </div>
              <h3 className="text-xl font-bold text-dark mb-2">{step.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
