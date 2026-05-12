import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vietų rezervacija - Arena Tickets",
  description: "Rezervuokite geriausias vietas arenoje. Interaktyvus vietų pasirinkimas su realaus laiko atnaujinimais.",
};

export const viewport: Viewport = {
  themeColor: "#f5a623",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="lt"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased bg-background`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
