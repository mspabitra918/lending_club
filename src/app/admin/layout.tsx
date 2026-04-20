"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { TiThMenu } from "react-icons/ti";
import { RiMenu2Line } from "react-icons/ri";

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
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

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

  React.useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

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
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Mobile Header */}
      <header className="md:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
        <h2 className="text-lg font-bold text-gray-900">Admin Panel</h2>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
          aria-label="Toggle Menu"
        >
          <RiMenu2Line className="w-6 h-6" />
        </button>
      </header>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 flex flex-col z-50 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="px-6 py-5 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Admin Panel</h2>
            <button
              className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-md"
              onClick={() => setIsSidebarOpen(false)}
            >
              <RiMenu2Line className="w-5 h-5" />
            </button>
          </div>
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

      <main className="flex-1 overflow-x-auto p-4 md:p-0">{children}</main>
    </div>
  );
}
