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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxProvider>
      <html>
        <body
          className={`${roboto.className} antialiased flex-1 h-full min-h-screen`}>
          <Navbar />

          {children}
          <Footer />
        </body>
      </html>
    </ReduxProvider>
  );
}
