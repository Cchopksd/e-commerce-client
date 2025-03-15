import type { Metadata } from "next";
import "./globals.css";
import { Roboto } from "next/font/google";

import ReduxProvider from "./store-provider";
import Footer from "./components/Footer";
import Navbar from "./components/navbar/NavbarMain";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: "normal",
});

export const metadata: Metadata = {
  title: {
    default: "ช้อปสินค้าออนไลน์คุณภาพดี ราคาคุ้มค่า | kiramiz",
    template: "%s | KIRAMIZ",
  },
  description:
    "Kiramiz แพลตฟอร์มช้อปปิ้งออนไลน์ที่รวมสินค้าแฟชั่น, อุปกรณ์อิเล็กทรอนิกส์, ของใช้ในบ้าน และสินค้าไลฟ์สไตล์คุณภาพดี พร้อมโปรโมชั่นสุดพิเศษทุกวัน",
  openGraph: {
    title: "KIRAMIZ - Your Fashion Destination",
    description:
      "Discover the latest fashion trends at KIRAMIZ. Shop our collection of high-quality clothing, accessories, and more.",
    url: "https://kiramiz.com",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} antialiased bg-slate-100 flex flex-col min-h-screen`}
      >
        <ReduxProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
