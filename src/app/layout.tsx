import type { Metadata } from "next";
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
  title: "Cayley-Hamilton Theorem Verification Tool | Interactive Linear Algebra",
  description:
    "Enter a Matrix. Verify the Theorem. Understand Every Step. A complete, interactive educational tool for verifying that every square matrix satisfies its own characteristic polynomial.",
  keywords: [
    "Cayley-Hamilton Theorem",
    "Matrix Calculator",
    "Linear Algebra",
    "Characteristic Polynomial",
    "Characteristic Equation",
    "Matrix Powers",
    "Eigenvalues",
    "Engineering Mathematics",
  ],
  authors: [{ name: "Linear Algebra Educational Suite" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
        {children}
      </body>
    </html>
  );
}
