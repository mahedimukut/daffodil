// app/layout.tsx
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "./components/Header";
import Footer from "./components/Footer";
import ClientWrapper from "./components/ClientWrapper"; // A client-side wrapper for SessionProvider
import TopBar from "./components/TopBar";
import WhatsAppWidget from "./components/WhatsApp";
import CustomQueryClientProvider from "@/lib/QueryClientProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  title: {
    default: "Daffodil HMO Solutions - Leading HMO Provider in Birmingham UK",
    template: "%s | Daffodil HMO Solutions"
  },
  description: "Specialists in profitable HMO operations. We support landlords and investors with HMO management, compliance, and maximising rental yields in Birmingham.",
  keywords: [
    "HMO solutions",
    "HMO management",
    "Birmingham HMO",
    "HMO compliance",
    "HMO landlords",
    "HMO investment",
    "UK HMO specialists"
  ],
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: "Daffodil HMO Solutions - Expert HMO Management in Birmingham",
    description: "Professional HMO solutions for landlords and investors. Maximise your rental property returns with our specialist services.",
    url: "https://www.daffodilhmosolutions.co.uk",
    siteName: "Daffodil HMO Solutions",
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Daffodil HMO Solutions - Professional HMO Management',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Daffodil HMO Solutions - HMO Experts in Birmingham",
    description: "Specialist HMO management services helping landlords achieve higher rental yields",
    images: ['/og-image.png'],
    site: '@daffodilhmo',
    creator: '@daffodilhmo',
  },
  metadataBase: new URL('https://www.daffodilhmosolutions.co.uk'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
  category: 'property management',
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
          <CustomQueryClientProvider>
            <TopBar />
            <Header />
            {children}
            <Footer />
            <WhatsAppWidget />
            <ToastContainer />
          </CustomQueryClientProvider>
        </ClientWrapper>
      </body>
    </html>
  );
}
