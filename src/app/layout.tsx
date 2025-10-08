import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const sentient = localFont({
  variable: "--font-sentient",
  src: "../../public/fonts/sentient/variable.ttf",
});

const switzer = localFont({
  variable: "--font-switzer",
  src: "../../public/fonts/switzer/variable.ttf",
});

export const metadata: Metadata = {
  title: "Arnav Bansal",
  description: "Hello World!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${switzer.variable} ${sentient.variable} ${switzer.className}  antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
