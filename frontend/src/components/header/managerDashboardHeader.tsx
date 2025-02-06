"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

interface ManagerHeaderProps {
  navs: { label: string; link: string }[];
}

const ManagerHeader: React.FC<ManagerHeaderProps> = ({ navs }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const { isLoggedIn, actionLogout } = useAuthStore();

  useEffect(() => {
    // if (!isLoggedIn) {
    //   router.push("/login");
    // }
  }, [router, isLoggedIn]);

  // if (!isLoggedIn) {
  //   return <></>;
  // }

  return (
    <nav className="bg-green-600">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              onClick={handleMobileMenuToggle}
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 12h18M3 6h18M3 18h18"
                  />
                </svg>
              )}
            </button>
          </div>

          <div className="flex flex-1 items-center justify-between sm:items-stretch sm:justify-start">
            <Link
              href={"/diary"}
              className="flex-shrink-0 text-gray-200 hover:text-white"
            >
              <FontAwesomeIcon icon={faBook} size="2xl" />
            </Link>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navs.map((nav, index) => (
                  <Link
                    key={index}
                    href={nav.link}
                    className={clsx(
                      "rounded-md p-2 text-sm font-medium",
                      pathname === nav.link
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-green-500 hover:text-white"
                    )}
                  >
                    {nav.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <Link
              href={"/user"}
              className="mr-3 p-2 rounded text-gray-300 hover:bg-green-500 hover:text-white"
            >
              <FontAwesomeIcon icon={faUser} />
            </Link>
            <button
              className="p-2 rounded text-gray-300 hover:bg-green-500 hover:text-white"
              title="logout"
              onClick={() => actionLogout()}
            >
              <FontAwesomeIcon icon={faRightFromBracket} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ManagerHeader;
