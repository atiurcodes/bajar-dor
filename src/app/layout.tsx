import type { Metadata } from "next";
import { Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "react-hot-toast";
import AuthSuccessToast from "@/components/AuthSuccessToast";

const bengaliFont = Noto_Sans_Bengali({
  variable: "--font-bengali",
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "বাজার দর | আজকের বাজারের দাম",
  description:
    "চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার আজকের বাজার দর এক নজরে।",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body className={`${bengaliFont.variable}`}>
        <Navbar />
        {children}
        <Footer />
        <AuthSuccessToast />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}