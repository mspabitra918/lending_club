"use client";

import React, { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { LoanApplication } from "@/types";

function AdminApplicationsInner() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const dateParam = searchParams.get("date") ?? "";
  const queryParam = searchParams.get("q") ?? "";
  const defaultDate = (() => {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  })();

  const [selectedDate, setSelectedDate] = useState(dateParam || defaultDate);

  const [applications, setApplications] = useState<LoanApplication[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [queryInput, setQueryInput] = useState(queryParam);

  useEffect(() => {
    if (queryInput === queryParam) return;
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (queryInput) params.set("q", queryInput);
      else params.delete("q");
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname);
    }, 400);
    return () => clearTimeout(handler);
  }, [queryInput, queryParam, searchParams, pathname, router]);

  useEffect(() => {
    setSelectedDate(dateParam || defaultDate);
  }, [dateParam, defaultDate]);

  useEffect(() => {
    if (!dateParam) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("date", defaultDate);
      if (queryParam) params.set("q", queryParam);
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, [dateParam, defaultDate, pathname, queryParam, router, searchParams]);

  useEffect(() => {
    let cancelled = false;

    const fetchApplications = async () => {
      setRefreshing(true);

      try {
        const qs = new URLSearchParams();
        if (dateParam) {
          qs.set("date", dateParam);
          qs.set("tzOffset", String(new Date().getTimezoneOffset()));
        }
        if (queryParam) qs.set("q", queryParam);

        const suffix = qs.toString() ? `?${qs.toString()}` : "";

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/loans/applications${suffix}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          },
        );

        if (!response.ok) throw new Error("Failed to fetch applications");

        const data = await response.json();

        if (cancelled) return;

        setApplications(data?.loans || []);
        setError(null);
      } catch (err: any) {
        if (!cancelled) setError(err.message || "Something went wrong");
      } finally {
        if (!cancelled) {
          setRefreshing(false);
          setInitialLoading(false);
        }
      }
    };

    fetchApplications();

    return () => {
      cancelled = true;
    };
  }, [dateParam, queryParam]);

  const updateParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (value) params.set(key, value);
      else params.delete(key);
    }
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname);
  };

  const handleDateChange = (value: string) => {
    console.log("Selected date:", value);
    setSelectedDate(value);
    updateParams({ date: value });
  };

  if (initialLoading) return <div className="p-8">Loading applications...</div>;

  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-2xl font-bold">Loan Applications</h1>
        {refreshing && (
          <span className="text-sm text-gray-500">Refreshing…</span>
        )}
      </div>
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="mb-6 bg-white rounded-lg shadow p-4 flex flex-col md:flex-row gap-4 md:items-end">
        <div className="flex-1">
          <label className="block text-xs font-medium text-gray-500 uppercase mb-1">
            Search
          </label>
          <input
            type="text"
            placeholder="Search by name, phone, or status"
            value={queryInput}
            onChange={(e) => setQueryInput(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 uppercase mb-1">
            Date
          </label>
          <input
            type="date"
            value={selectedDate}
            onClick={() => console.log("date input clicked")}
            onInput={(e) =>
              console.log("onInput:", (e.target as HTMLInputElement).value)
            }
            onChange={(e) => {
              console.log("onChange:", e.target.value);
              handleDateChange(e.target.value);
            }}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        {(dateParam || queryParam) && (
          <button
            type="button"
            onClick={() => {
              setQueryInput("");
              setSelectedDate(defaultDate);
              updateParams({ date: "", q: "" });
            }}
            className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 text-gray-700"
          >
            Clear
          </button>
        )}
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {applications.map((app) => (
              <tr key={app.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {app.applicantFullName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {app.applicantPhoneNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  ${app?.applicantLoanAmount?.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      app.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : app.status === "declined"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {app.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(app.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link
                    href={`/admin/applications/${app.id}`}
                    className="text-primary hover:text-primary-dark"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
            {applications.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                  No applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function AdminApplications() {
  return (
    <Suspense fallback={<div className="p-8">Loading applications...</div>}>
      <AdminApplicationsInner />
    </Suspense>
  );
}
