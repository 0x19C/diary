"use client";

import "./globals.css";
import { ManagerDashboardHeader } from "@/components/header";
import { useAuthStore } from "@/store/auth";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Skeleton from "@/components/skeleton";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoggedIn, actionWhoAmICredential } = useAuthStore();
  useEffect(() => {
    if (isLoggedIn == 0) {
      actionWhoAmICredential()
        .then((res) => {
          if (!res.data?.is_admin && pathname.includes("/user")) {
            router.push("/diary");
          } else if (res.data?.is_admin && pathname.includes("/diary")) {
            router.push("/users");
          }
        })
        .catch(() => {
          router.push("/login");
        });
    }
  }, [isLoggedIn, router, pathname, actionWhoAmICredential]);
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <ManagerDashboardHeader />
        {isLoggedIn == 0 ? <Skeleton /> : children}
      </body>
    </html>
  );
}
