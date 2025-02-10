"use client"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ManagerDashboardHeader } from "@/components/header";
import { useAuthStore } from "@/store/auth";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

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
    link: "/users",
    admin: true
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const {isLoggedIn, actionWhoAmICredential} = useAuthStore();
  useEffect(() => {
    actionWhoAmICredential()
      .then((res) => {
        if(!res.data.is_admin && pathname.includes('/user')){
          router.push('/diary')
        } else if(res.data.is_admin && pathname.includes('/diary')) {
          router.push('/users')
        }
      })
      .catch(()=> {
        router.push('/login')
      });
  },[isLoggedIn, router])
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
