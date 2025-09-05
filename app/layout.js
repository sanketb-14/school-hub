"use strict";

import React from "react";
import { Inter, Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Navbar from "./components/Navbar";
import "./globals.css";
import { Suspense } from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata = {
  title: "School Management System",
  description: "A comprehensive school management system built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html 
      lang="en" 
      data-theme="light" 
      className={`${inter.variable} ${poppins.variable}`}
    >
      <body className="font-sans antialiased">
        <Suspense fallback={<div>Loading...</div>}>
          <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            <Navbar />
            <main className="container mx-auto px-4 py-8">{children}</main>
          </div>
        </Suspense>
        <Analytics />
      </body>
    </html>
  );
}