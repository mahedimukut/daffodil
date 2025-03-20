// app/dashboard/layout.tsx
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { Sidebar } from "./components/sidebar";
import { auth } from "../../../../auth";

// Import both fonts with CSS variables
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// Metadata for SEO (optional, customize as needed)
export const metadata: Metadata = {
  title: "Dashboard - Daffodil HMO Solutions",
  description: "Manage your HMO business efficiently.",
};

export default async function DashboardLayout({
  children,
  user,
}: {
  children: React.ReactNode;
  user: any;
}) {
  const session = await auth(); // Fetch the session on the server side
  const cuser = session?.user;
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body className="font-sans antialiased bg-white text-charcoalGray">
        {/* This layout will only render the dashboard content */}
        <div className="flex">
          <Sidebar user={cuser} />
          <div className="flex-1">{children}</div>
        </div>
      </body>
    </html>
  );
}
