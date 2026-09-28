import type { Metadata } from "next";
import React from "react";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { LanguageProvider } from "@/context/LanguageContext";
import { ToastProvider } from "@/context/ToastContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://afronova.org"),
  title: {
    default: "AfroNova | Branding the New Africa, Limitless Possibilities",
    template: "%s | AfroNova",
  },
  description:
    "AfroNova is a premier Pan-African enterprise dedicated to celebrating, amplifying and promoting Africa's cultural heritage, innovation and creative excellence. Official local partner of Legendary Gold Limited and core organizer of Africa Celebrates.",
  keywords: [
    "AfroNova",
    "Africa Celebrates",
    "Pan-African events",
    "Addis Ababa",
    "event management",
    "multimedia production",
    "Africa festival",
    "Legendary Gold Limited",
  ],
  authors: [{ name: "AfroNova Media House & Events" }],
  creator: "AfroNova",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://afronova.org",
    siteName: "AfroNova",
    title: "AfroNova | Branding the New Africa",
    description:
      "Pan-African event management, multimedia production & advertising, headquartered in Addis Ababa, Ethiopia.",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "AfroNova, Branding the New Africa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AfroNova | Branding the New Africa",
    description:
      "Pan-African event management, multimedia production & advertising across 50+ countries.",
    images: ["/logo.png"],
    creator: "@socialafronova",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth min-h-full">
      <body className="min-h-screen flex flex-col text-[#101312]">
        <LanguageProvider>
          <ToastProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </ToastProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

