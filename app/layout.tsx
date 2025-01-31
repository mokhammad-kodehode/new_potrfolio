import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "./components/navbar";
import "./globals.css";
import MouseFollower from "./components/mouseFollower";
import ThemeProvider from "./components/themeSwitcher";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Mohammad Dzhabrailov Portfolio",
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
        <ThemeProvider>
        <Navbar/>
        <MouseFollower />
        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
