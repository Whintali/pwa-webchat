import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar, NavbarContent } from "@heroui/react";
import NavBarComponent from "./components/Navbar";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'PWA Webchat',
  description: 'PWA Webchat Application',
  manifest: '/manifest.json',
  themeColor: '#000000',
  icons: {
    icon: '/globe.svg',
    apple: '/globe.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NavBarComponent/>
          {children}
        
      </body>
    </html>
  );
}
