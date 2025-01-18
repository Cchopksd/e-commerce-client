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
    default: "KIRAMIZ - Your Fashion Destination",
    template: "%s | KIRAMIZ",
  },
  description:
    "Discover the latest fashion trends at KIRAMIZ. Shop our collection of high-quality clothing, accessories, and more.",
  keywords: [
    "fashion",
    "clothing",
    "accessories",
    "online shopping",
    "KIRAMIZ",
  ],
  authors: [{ name: "KIRAMIZ" }],
  openGraph: {
    title: "KIRAMIZ - Your Fashion Destination",
    description:
      "Discover the latest fashion trends at KIRAMIZ. Shop our collection of high-quality clothing, accessories, and more.",
    url: "https://kiramiz.com",
    siteName: "KIRAMIZ",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
  auth,
}: Readonly<{
  children: React.ReactNode;
  auth: React.ReactNode;
}>) {
  return (
    <ReduxProvider>
      <html lang="en">
        <body
          className={`${roboto.className} antialiased flex-1 h-full min-h-screen`}>
          <Navbar />
          {auth}
          {children}
          <Footer />
        </body>
      </html>
    </ReduxProvider>
  );
}
