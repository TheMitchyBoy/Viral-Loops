import type { Metadata } from "next";
import { UserProvider } from "@/context/UserContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ShareModal from "@/components/ShareModal";
import "./globals.css";

export const metadata: Metadata = {
  title: "Riverside Daily — Local News with Rewards",
  description:
    "Your trusted source for Riverside local news. Share stories, earn rewards, and unlock exclusive community content.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-stone-50 text-stone-900 min-h-screen">
        <UserProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <ShareModal />
        </UserProvider>
      </body>
    </html>
  );
}
