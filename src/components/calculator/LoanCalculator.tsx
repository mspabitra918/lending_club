import Link from "next/link";
import { useState } from "react";

export function LoanCalculator() {
  const [amount, setAmount] = useState<number>(10000);
  const [term, setTerm] = useState<number>(36);
  const rate = 0.0699;

  const monthlyRate = rate / 12;
  const monthlyPayment =
    (amount * monthlyRate * Math.pow(1 + monthlyRate, term)) /
    (Math.pow(1 + monthlyRate, term) - 1);
  const totalRepayment = monthlyPayment * term;

  return (
    <section id="calculator" className="py-24 bg-section-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Rates & Fees
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-dark mt-2">
            Loan Calculator
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Estimate your monthly payments with our interactive calculator.
            Transparent rates, no surprises.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-2">
              {/* Controls */}
              <div className="p-8 lg:p-10">
                <div className="mb-8">
                  <div className="flex justify-between mb-3">
                    <label className="text-sm font-semibold text-dark">
                      Loan Amount
                    </label>
                    <span className="text-2xl font-extrabold text-primary">
                      ${amount.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={2000}
                    max={50000}
                    step={500}
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>$2,000</span>
                    <span>$50,000</span>
                  </div>
                </div>

                <div className="mb-8">
                  <label className="text-sm font-semibold text-dark block mb-3">
                    Loan Term
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[24, 36, 60].map((t) => (
                      <button
                        key={t}
                        onClick={() => setTerm(t)}
                        className={`py-3 rounded-xl font-semibold text-sm transition-all ${
                          term === t
                            ? "bg-primary text-white shadow-lg"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {t} months
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-primary-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-sm text-primary font-medium">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Fixed APR: {(rate * 100).toFixed(2)}%
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="bg-cta-gradient p-8 lg:p-10 text-white flex flex-col justify-center">
                <p className="text-white/70 text-sm mb-1">Monthly Payment</p>
                <p className="text-5xl font-extrabold mb-6">
                  ${monthlyPayment.toFixed(2)}
                </p>

                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">Loan Amount</span>
                    <span className="font-semibold">
                      ${amount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">Interest Rate</span>
                    <span className="font-semibold">
                      {(rate * 100).toFixed(2)}% APR
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">Loan Term</span>
                    <span className="font-semibold">{term} months</span>
                  </div>
                  <div className="h-px bg-white/20" />
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">Total Repayment</span>
                    <span className="font-bold text-lg">
                      ${totalRepayment.toFixed(2)}
                    </span>
                  </div>
                </div>

                <Link
                  href="/apply"
                  className="mt-8 inline-flex items-center justify-center bg-white text-primary-dark font-bold py-3.5 rounded-xl hover:bg-gray-100 transition-all hover:shadow-lg text-center"
                >
                  Apply for This Loan
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
