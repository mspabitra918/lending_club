import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import Link from "next/link";
import emailjs from "@emailjs/browser";
// ── EmailJS config ──────────────────────────────────────
// Replace these with your actual EmailJS credentials:
// 1. Sign up at https://www.emailjs.com
// 2. Add Gmail as an email service
// 3. Create an email template with variables:
//    {{from_name}}, {{from_email}}, {{phone}}, {{loan_amount}},
//    {{loan_purpose}}, {{employment}}, {{annual_income}}, {{message}}
// 4. Copy your Service ID, Template ID, and Public Key below
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";

export function ApplyFormContent() {
  const searchParams = useSearchParams();
  const purposeFromUrl = searchParams.get("purpose") || "";
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    phone: "",
    loan_amount: "10000",
    loan_purpose: purposeFromUrl || "debt-consolidation",
    employment: "employed",
    annual_income: "",
    credit_score: "good",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current!,
        EMAILJS_PUBLIC_KEY,
      );
      setStatus("sent");
      setFormData({
        from_name: "",
        from_email: "",
        phone: "",
        loan_amount: "10000",
        loan_purpose: "debt-consolidation",
        employment: "employed",
        annual_income: "",
        credit_score: "good",
        message: "",
      });
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4 animate-fade-in-up">
          <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-success"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-dark mb-3">
            Application Submitted!
          </h2>
          <p className="text-gray-500 mb-8">
            Thank you for your application. Our team will review your
            information and contact you within 24 hours.
          </p>
          <Link
            href="/"
            className="inline-flex items-center bg-primary hover:bg-primary-dark text-white font-bold px-8 py-3.5 rounded-xl transition-all"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <span className="text-primary font-semibold text-sm uppercase tracking-wider">
          Loan Application
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-dark mt-2">
          Apply for Your Loan
        </h1>
        <p className="text-gray-500 mt-3 max-w-lg mx-auto">
          Fill out the form below and we&apos;ll get back to you with a
          personalized offer. It only takes a few minutes.
        </p>
      </div>

      {/* Trust badges */}
      <div className="flex flex-wrap justify-center gap-6 mb-10">
        {[
          {
            icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
            label: "SSL Encrypted",
          },
          {
            icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
            label: "No Credit Impact",
          },
          {
            icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
            label: "5-Min Application",
          },
        ].map((b) => (
          <div
            key={b.label}
            className="flex items-center gap-2 text-gray-500 text-sm"
          >
            <svg
              className="w-5 h-5 text-success"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={b.icon}
              />
            </svg>
            {b.label}
          </div>
        ))}
      </div>

      {/* Form */}
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-xl p-8 lg:p-12"
      >
        {/* Step 1 - Personal Info */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
              1
            </div>
            <h2 className="text-xl font-bold text-dark">
              Personal Information
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="from_name"
                required
                value={formData.from_name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-gray-800"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="from_email"
                required
                value={formData.from_email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-gray-800"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="(555) 123-4567"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-gray-800"
              />
            </div>
          </div>
        </div>

        {/* Step 2 - Loan Details */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
              2
            </div>
            <h2 className="text-xl font-bold text-dark">Loan Details</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Desired Loan Amount *
              </label>
              <select
                name="loan_amount"
                required
                value={formData.loan_amount}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-gray-800 bg-white"
              >
                <option value="2000">$2,000</option>
                <option value="5000">$5,000</option>
                <option value="10000">$10,000</option>
                <option value="15000">$15,000</option>
                <option value="20000">$20,000</option>
                <option value="25000">$25,000</option>
                <option value="30000">$30,000</option>
                <option value="40000">$40,000</option>
                <option value="50000">$50,000</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Loan Purpose *
              </label>
              <select
                name="loan_purpose"
                required
                value={formData.loan_purpose}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-gray-800 bg-white"
              >
                <option value="debt-consolidation">Debt Consolidation</option>
                <option value="home-improvement">Home Improvement</option>
                <option value="medical">Medical Expenses</option>
                <option value="business">Business</option>
                <option value="education">Education</option>
                <option value="major-purchase">Major Purchase</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Step 3 - Financial Info */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
              3
            </div>
            <h2 className="text-xl font-bold text-dark">
              Financial Information
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Employment Status *
              </label>
              <select
                name="employment"
                required
                value={formData.employment}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-gray-800 bg-white"
              >
                <option value="employed">Employed</option>
                <option value="self-employed">Self-Employed</option>
                <option value="retired">Retired</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Annual Income *
              </label>
              <input
                type="text"
                name="annual_income"
                required
                value={formData.annual_income}
                onChange={handleChange}
                placeholder="$50,000"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-gray-800"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Credit Score Range
              </label>
              <select
                name="credit_score"
                value={formData.credit_score}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-gray-800 bg-white"
              >
                <option value="excellent">Excellent (750+)</option>
                <option value="good">Good (700-749)</option>
                <option value="fair">Fair (650-699)</option>
                <option value="poor">Below 650</option>
              </select>
            </div>
          </div>
        </div>

        {/* Additional notes */}
        <div className="mb-10">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Additional Notes (Optional)
          </label>
          <textarea
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us anything else about your loan needs..."
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-gray-800 resize-none"
          />
        </div>

        {/* Disclaimer */}
        <div className="bg-gray-50 rounded-xl p-4 mb-8 text-xs text-gray-500 leading-relaxed">
          By submitting this application, you agree to our Terms of Service and
          Privacy Policy. Checking your rate will not affect your credit score.
          This is not a commitment to lend. All loan applications are subject to
          review and approval.
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full bg-primary hover:bg-primary-dark disabled:bg-gray-300 text-white font-bold py-4 rounded-xl transition-all hover:shadow-xl hover:-translate-y-0.5 text-lg flex items-center justify-center gap-2"
        >
          {status === "sending" ? (
            <>
              <svg
                className="animate-spin w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Submitting...
            </>
          ) : (
            <>
              Submit Application
              <svg
                className="w-5 h-5"
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
            </>
          )}
        </button>

        {status === "error" && (
          <div className="mt-4 bg-red-50 text-red-600 p-4 rounded-xl text-sm text-center">
            Something went wrong. Please try again or contact us directly at
            support@lendingclubs.pro
          </div>
        )}
      </form>
    </div>
  );
}
