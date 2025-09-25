"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { theme } from "@/lib/theme";

const items = [
  { href: "/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/history", label: "History", icon: "📜" },
  { href: "/profile", label: "Profile", icon: "👤" },
];

export default function SideBar() {
  const pathname = usePathname();

  return (
    <aside
      className="hidden md:flex md:flex-col md:w-60 border-r"
      style={{ borderColor: theme.colors.border, background: theme.colors.surface }}
      aria-label="Sidebar"
    >
      <div className="p-4">
        <div className="text-xs uppercase tracking-wide text-gray-500">
          Navigation
        </div>
      </div>
      <nav className="flex-1 px-2 space-y-1">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 px-3 py-2 rounded-md text-sm transition ${
                active
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <span className="w-5" aria-hidden>
                {item.icon}
              </span>
              <span>{item.label}</span>
              {active && (
                <span
                  className="ml-auto h-2 w-2 rounded-full"
                  style={{ backgroundColor: theme.colors.secondary }}
                  aria-hidden
                />
              )}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 text-xs text-gray-400">
        Ocean Professional • {new Date().getFullYear()}
      </div>
    </aside>
  );
}
