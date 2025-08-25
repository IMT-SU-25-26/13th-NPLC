import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavigationBar from "@/components/utils/NavigationBar";
import { Toaster } from "sonner";
import Script from "next/script";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "13th NPLC",
  description: "IMT SU Universitas Ciputra Surabaya",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
         <Script
          src="https://app.midtrans.com/snap/snap.js"
          data-client-key={process.env.NEXT_PUBLIC_MID_TRANS_CLIENT}
          // data-server-key={process.env.MID_TRANS_SECRET}
          strategy="afterInteractive"
        />
        <NavigationBar />
        {children}
        <Toaster/>
      </body>
    </html>
  );
}
