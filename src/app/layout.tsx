import type { Metadata } from "next";
import { Quando } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const switzer = localFont({
  variable: "--font-switzer",
  src: "../../public/fonts/switzer/variable.ttf",
});

const quando = Quando({
  variable: "--font-quando",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Arnav Bansal",
  description: "Computer Science Student @ UIUC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${switzer.variable} ${switzer.className} ${quando.variable} antialiased relative`}
      >
        {children}
      </body>
    </html>
  );
}
