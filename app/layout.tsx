import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "مَسْرَحِي | MASRAHI", description: "من النص إلى الخشبة — Du texte à la scène" };
export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="ar" dir="rtl"><body>{children}</body></html>;
}