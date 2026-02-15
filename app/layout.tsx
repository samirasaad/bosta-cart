import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { QueryProvider } from "@/providers/QueryProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Toast } from "@/components/ui/Toast";
import { GlobalFetchingIndicator } from "@/components/ui/GlobalFetchingIndicator";
import { env } from "@/lib/env";
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
  metadataBase: new URL(env.appUrl),
  title: `${env.siteName} | All products`,
  description: "E-commerce demo with Fake Store API",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
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
        <QueryProvider>
          <GlobalFetchingIndicator />
          <div className="flex min-h-screen flex-col">
            <Header />
            <div className="flex-1 min-h-0 flex flex-col justify-center">{children}</div>
            <Footer />
          </div>
          <Toast />
        </QueryProvider>
      </body>
    </html>
  );
}
