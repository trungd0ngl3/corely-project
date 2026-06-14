import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Corely | High-Performance Computing Hardware",
  description: "Engineered for high-performance computing. Precise, powerful, and dependable hardware for professionals and enthusiasts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-on-background">
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
