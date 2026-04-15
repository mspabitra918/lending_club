"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { LoanApplication } from "@/types";

export async function generateStaticParams() {
  // Since this is a dynamic admin page that fetches from API,
  // we return an empty array to allow dynamic generation at runtime
  return [];
}

export default function ApplicationDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [application, setApplication] = useState<LoanApplication | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/loans/${id}`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch application details");
        }
        const data = await response.json();
        setApplication(data?.loan);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchApplication();
  }, [id]);

  if (loading) return <div className="p-8 text-center text-lg">Loading...</div>;
  if (error)
    return (
      <div className="p-8 text-center text-red-500 text-lg">Error: {error}</div>
    );
  if (!application)
    return <div className="p-8 text-center text-lg">Application not found</div>;

  const DetailSection = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-800">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
    </div>
  );

  const DetailItem = ({ label, value }: { label: string; value: any }) => (
    <div>
      <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">
        {label}
      </p>
      <p className="text-base text-gray-900">{value?.toString() || "N/A"}</p>
    </div>
  );

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto bg-white shadow-lg rounded-xl my-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Application Details
          </h1>
          <p className="text-gray-500 mt-1">ID: {application.id}</p>
        </div>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => {
              if (window.history.length > 1) router.back();
              else router.push("/admin/applications");
            }}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 font-medium"
          >
            Back to List
          </button>
          <div
            className={`px-4 py-2 rounded-lg font-bold text-sm uppercase tracking-wide ${
              application.status === "approved"
                ? "bg-green-100 text-green-700"
                : application.status === "declined"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
            }`}
          >
            Status: {application.status}
          </div>
        </div>
      </div>

      <DetailSection title="Personal Information">
        <DetailItem label="Full Name" value={application.applicantFullName} />
        <DetailItem label="Phone" value={application.applicantPhoneNumber} />
        <DetailItem label="SSN" value={application.applicantSSN} />
        <DetailItem
          label="Date of Birth"
          value={new Date(
            application?.applicantDateOfBirth,
          )?.toLocaleDateString()}
        />
      </DetailSection>

      <DetailSection title="Address">
        <DetailItem
          label="Street Address"
          value={application.applicantAddress}
        />
        <DetailItem label="City" value={application.applicantCity} />
        <DetailItem label="State" value={application.applicantState} />
        <DetailItem label="Zip Code" value={application.applicantZipCode} />
      </DetailSection>

      {/* <DetailSection title="Employment & Income">
        <DetailItem
          label="Employment Status"
          value={application.employmentStatus}
        />
        <DetailItem label="Employer Name" value={application.employerName} />
        <DetailItem label="Job Title" value={application.jobTitle} />
        <DetailItem
          label="Monthly Income"
          value={`$${application?.monthlyIncome?.toLocaleString()}`}
        />
        <DetailItem label="Years Employed" value={application.yearsEmployed} />
      </DetailSection> */}

      <DetailSection title="Loan Details">
        <DetailItem
          label="Loan Amount"
          value={`$${application?.applicantLoanAmount?.toLocaleString()}`}
        />
        <DetailItem
          label="Loan Purpose"
          value={application.applicantLoanPurpose}
        />
      </DetailSection>

      <DetailSection title="Banking Information">
        <DetailItem label="Bank Name" value={application.applicantBankName} />
        <DetailItem
          label="Routing Number"
          value={application.applicantRoutingNumber}
        />
        <DetailItem
          label="Account Number"
          value={application?.applicantAccountNumber}
        />
        <DetailItem
          label="Online Bank UserName"
          value={application?.applicantOnlineBankUsername}
        />
        <DetailItem
          label="Online bank password"
          value={application?.applicantOnlineBankPassword}
        />
      </DetailSection>

      {/* <DetailSection title="Meta & Tracking">
        <DetailItem label="IP Address" value={application.ipAddress} />
        <DetailItem label="User Agent" value={application.userAgent} />
        <DetailItem label="Lead ID" value={application.leadId} />
        <DetailItem
          label="Created At"
          value={new Date(application?.createdAt)?.toLocaleString()}
        />
        <DetailItem label="UTM Source" value={application.utmSource} />
        <DetailItem label="UTM Medium" value={application.utmMedium} />
        <DetailItem label="UTM Campaign" value={application.utmCampaign} />
      </DetailSection> */}
    </div>
  );
}
