import type { Metadata } from "next";
import { UserProvider } from "@/context/UserContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FollowModal from "@/components/FollowModal";
import "./globals.css";

export const metadata: Metadata = {
  title: "Riverside Daily — Local News with Exclusive Access",
  description:
    "Your trusted source for Riverside local news. Follow us on Facebook to unlock exclusive investigations, bonus videos, and insider content.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-stone-50 text-stone-900 min-h-screen">
        <UserProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <FollowModal />
        </UserProvider>
      </body>
    </html>
  );
}
