import type { Metadata } from "next";
import { SITE_NAME, CITY_NAME } from "@/lib/brand";
import { Syne, DM_Sans, Instrument_Serif } from "next/font/google";
import { UserProvider } from "@/context/UserContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FollowModal from "@/components/FollowModal";
import FacebookSDK from "@/lib/facebook-client";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${SITE_NAME} — ${CITY_NAME} Local News`,
  description:
    `Independent local news from ${SITE_NAME} in ${CITY_NAME}. Follow on Facebook to unlock exclusive investigations, viral community loops, and insider content.`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable} ${instrumentSerif.variable}`}>
      <body className="min-h-screen antialiased">
        <UserProvider>
          <FacebookSDK />
          <Header />
          <main className="relative">{children}</main>
          <Footer />
          <FollowModal />
        </UserProvider>
      </body>
    </html>
  );
}
