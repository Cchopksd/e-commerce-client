import { Metadata } from "next";

export const metadata: Metadata = {
  title: "E-commerce | Checkout",
  description: "Complete your purchase and enjoy shopping with us!",
  keywords: [
    "e-commerce",
    "shopping",
    "checkout",
    "online store",
    "buy products",
  ],
  robots: "index, follow",
  //   openGraph: {
  //     title: "บริการของเรา - Kiramiz",
  //     description:
  //       "บริการพัฒนาเว็บไซต์ราคาถูกและคุณภาพสูง ออกแบบเว็บไซต์ตามความต้องการของลูกค้า โดยทีมงานมืออาชีพ",
  //     url: "URL ของหน้าเว็บไซต์บริการ",
  //     images: [
  //       {
  //         url: "https://res.cloudinary.com/du2ue2bj0/image/upload/v1728653437/Kiramiz/gxyhm0e6noqz7emt3y1p.png",
  //         width: 800,
  //         height: 600,
  //         alt: "บริการของเรา - Kiramiz",
  //       },
  //     ],
  //   },
  //   alternates: {
  //     canonical: "https://www.kiramiz.com/services",
  //   },
};

export default function ServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
