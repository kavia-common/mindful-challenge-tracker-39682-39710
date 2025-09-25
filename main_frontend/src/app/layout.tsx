import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";

export const metadata: Metadata = {
  title: "Feel The Pain",
  description: "Mindful Challenge Tracker",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className="min-h-screen">
        <NavBar />
        <div className="relative">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-500/10 to-gray-50" />
          <div className="container-pro py-6">
            <div className="flex">
              <SideBar />
              <main className="flex-1 md:pl-6">
                {children}
              </main>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
