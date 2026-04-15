"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navItems = [{ href: "/admin/applications", label: "Applications" }];

type AdminUser = { email?: string; name?: string } | null;

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const normalizedPath = pathname?.replace(/\/+$/, "") || "/";
  const isLoginRoute = normalizedPath === "/admin/login";

  const [user, setUser] = React.useState<AdminUser>(null);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = localStorage.getItem("adminUser");
    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch {
        setUser({ email: raw });
      }
    } else if (!isLoginRoute) {
      router.replace("/admin/login");
      return;
    }
    setReady(true);
  }, [isLoginRoute, router]);

  const handleLogout = () => {
    localStorage.removeItem("adminUser");
    localStorage.removeItem("adminToken");
    setUser(null);
    router.replace("/admin/login");
  };

  if (isLoginRoute) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="px-6 py-5 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Admin Panel</h2>
          {user?.email && (
            <p className="text-xs text-gray-500 mt-1 truncate">{user.email}</p>
          )}
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const active =
              pathname === item.href || pathname?.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="px-3 py-4 border-t border-gray-200">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full px-3 py-2 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-x-auto">{children}</main>
    </div>
  );
}
