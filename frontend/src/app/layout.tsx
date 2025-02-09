"use client"
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ManagerDashboardHeader } from "@/components/header";
import { useAuthStore } from "@/store/auth";
import { useEffect } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


const HeaderNavs = [
  {
    label: "Diary",
    link: "/diary",
    admin: false,
  },
  {
    label: "User Management",
    link: "/user",
    admin: true
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const { isLoggedIn, actionLogout, isAdmin,actionWhoAmICredential } = useAuthStore();
  useEffect(() => {
    actionWhoAmICredential();

  },[])
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ManagerDashboardHeader navs={HeaderNavs} />
        {children}
      </body>
    </html>
  );
}
