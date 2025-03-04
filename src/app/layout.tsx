import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "./components/Header";
import Footer from "./components/Footer";
import ClientWrapper from "./components/ClientWrapper"; // A client-side wrapper for SessionProvider
import TopBar from "./components/TopBar";
import ScrollToTop from "./components/ScrollToTop";
import WhatsAppWidget from "./components/WhatsApp";

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

// Metadata for SEO
export const metadata: Metadata = {
  title:
    "Daffodil HMO Solutions - A Leading HMO Solutions Provider in Birmingham UK",
  description:
    "Daffodil Solutions specializes in profitable HMO business operations based in Birmingham, UK. Our aim is to support HMO businesses with their day-to-day challenges.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body className="font-sans antialiased bg-white text-charcoalGray">
        <ClientWrapper>
          <TopBar />
          <Header />
          {children}
          <Footer />
          <WhatsAppWidget />
        </ClientWrapper>
      </body>
    </html>
  );
}
