// app/layout.tsx

import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import { CamouflageProvider } from "../context/CamouflageContext";
import AppContent from "./AppContent";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Aruna",
  description: "Aplikasi untuk keamanan perempuan dan anak",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body className={`${quicksand.className} antialiased`}>
        <CamouflageProvider>
          <AppContent>{children}</AppContent>
        </CamouflageProvider>
      </body>
    </html>
  );
}