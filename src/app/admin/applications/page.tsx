"use client";

import React, {
  Suspense,
  useCallback,
  useEffect,
  useState,
} from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { LoanApplication } from "@/types";

const todayISO = () => {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

function AdminApplicationsInner() {
  const searchParams = useSearchParams();

  const initialDate = searchParams.get("date") || todayISO();
  const initialQuery = searchParams.get("q") || "";

  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [queryInput, setQueryInput] = useState(initialQuery);

  const [applications, setApplications] = useState<LoanApplication[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const syncUrl = useCallback((date: string, q: string) => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams();
    if (date) params.set("date", date);
    if (q) params.set("q", q);
    const qs = params.toString();
    const url = `${window.location.pathname}${qs ? `?${qs}` : ""}`;
    window.history.replaceState(null, "", url);
  }, []);

  const [debouncedQuery, setDebouncedQuery] = useState(queryInput);
  useEffect(() => {
    const handle = setTimeout(() => setDebouncedQuery(queryInput), 400);
    return () => clearTimeout(handle);
  }, [queryInput]);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      setRefreshing(true);
      try {
        const qs = new URLSearchParams();
        if (selectedDate) {
          qs.set("date", selectedDate);
          qs.set("tzOffset", String(new Date().getTimezoneOffset()));
        }
        if (debouncedQuery) qs.set("q", debouncedQuery);

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
      } catch (err: unknown) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Something went wrong");
        }
      } finally {
        if (!cancelled) {
          setRefreshing(false);
          setInitialLoading(false);
        }
      }
    };

    run();
    syncUrl(selectedDate, debouncedQuery);

    return () => {
      cancelled = true;
    };
  }, [selectedDate, debouncedQuery, syncUrl]);

  const handleDateChange = (value: string) => {
    setSelectedDate(value);
  };

  const handleClear = () => {
    setQueryInput("");
    setDebouncedQuery("");
    setSelectedDate(todayISO());
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
            onChange={(e) => handleDateChange(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        {(selectedDate !== todayISO() || queryInput) && (
          <button
            type="button"
            onClick={handleClear}
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
