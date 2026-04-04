import Link from "next/link";

export function LoanTypes() {
  const loans = [
    {
      icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
      title: "Debt Consolidation",
      desc: "Simplify your finances by combining multiple debts into one manageable payment.",
    },
    {
      icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
      title: "Home Improvement",
      desc: "Transform your living space with funds for renovations and upgrades.",
    },
    {
      icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
      title: "Medical Expenses",
      desc: "Cover unexpected medical bills without the stress of high-interest credit cards.",
    },
    {
      icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
      title: "Business",
      desc: "Fund your business ventures and take your entrepreneurial goals to the next level.",
    },
    {
      icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
      title: "Education",
      desc: "Invest in your future with funding for tuition, certifications, and training programs.",
    },
    {
      icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
      title: "Major Purchase",
      desc: "Finance large purchases with predictable monthly payments and competitive rates.",
    },
  ];

  return (
    <section className="py-24 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Loan Options
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-dark mt-2">
            Personal Loans for Every Need
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Whatever your financial goal, we have a loan solution tailored for
            you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loans.map((loan, i) => (
            <div
              key={i}
              className="group bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              <div className="w-14 h-14 bg-primary/10 group-hover:bg-primary rounded-xl flex items-center justify-center mb-5 transition-colors">
                <svg
                  className="w-7 h-7 text-primary group-hover:text-white transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={loan.icon}
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-dark mb-2">{loan.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                {loan.desc}
              </p>
              <Link
                href={`/apply?purpose=${loan.title.toLowerCase().replace(/ /g, "-")}`}
                className="inline-flex items-center text-primary font-semibold text-sm hover:text-primary-dark transition-colors"
              >
                Apply Now
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
