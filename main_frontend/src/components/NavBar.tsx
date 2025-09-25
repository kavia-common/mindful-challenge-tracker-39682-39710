"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { theme } from "@/lib/theme";

function NavLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <Link
      href={href}
      className={`px-3 py-2 rounded-md transition-colors ${
        active
          ? "bg-white/80 text-gray-900 shadow-sm"
          : "text-white/90 hover:text-white"
      }`}
    >
      {label}
    </Link>
  );
}

export default function NavBar() {
  return (
    <header
      className="sticky top-0 z-40 w-full border-b border-white/20 backdrop-blur"
      style={{
        background:
          "linear-gradient(135deg, rgba(37,99,235,0.95) 0%, rgba(59,130,246,0.9) 100%)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="h-9 w-9 rounded-md grid place-items-center text-white font-bold"
            style={{ backgroundColor: theme.colors.secondary }}
            aria-label="Feel The Pain logo"
          >
            FP
          </div>
          <div className="text-white">
            <div className="font-semibold leading-tight">Feel The Pain</div>
            <div className="text-xs opacity-90">Mindful Challenge Tracker</div>
          </div>
        </div>
        <nav className="flex items-center gap-2">
          <NavLink href="/dashboard" label="Dashboard" />
          <NavLink href="/history" label="History" />
          <NavLink href="/profile" label="Profile" />
        </nav>
      </div>
    </header>
  );
}
