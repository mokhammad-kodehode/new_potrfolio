import type { Metadata } from "next";
import { Geist, Geist_Mono,Quicksand } from "next/font/google";
import Navbar from "./components/navbar";
import "./globals.css";
import MouseFollower from "./components/mouseFollower";
import { ThemeProvider } from "./components/themeSwitcher";
import PageTransition from "./components/PageTransiction";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'], // что реально нужно
  variable: '--font-quicksand',               // CSS-переменная
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
        className={`${geistSans.variable} ${geistMono.variable} ${quicksand.variable} antialiased`}
      >
        <ThemeProvider>
        <Navbar/>
        <MouseFollower />
        <PageTransition>{children}</PageTransition>
        </ThemeProvider>
      </body>
    </html>
  );
}
