"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

const ManagerHeader = () => {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogoutClick = () => {
    actionLogout();
    router.push("/login");
  };

  const { actionLogout, isLoggedIn, isAdmin } = useAuthStore();

  return (
    <nav className="bg-green-600">
      <div className="container mx-auto">
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
              href={isAdmin ? "/users" : "/diary"}
              className="flex-shrink-0 text-gray-200 hover:text-white"
            >
              <Image
                src={"/diary_logo4.png"}
                width={40}
                height={40}
                alt="logo"
              />
            </Link>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {isLoggedIn == 2 && !isAdmin && (
              <Link
                href={"/profile"}
                className="mr-3 p-2 rounded text-gray-300 hover:bg-green-500 hover:text-white"
                title="プロフィール"
              >
                <FontAwesomeIcon icon={faUser} />
              </Link>
            )}
            {isLoggedIn == 2 && (
              <button
                className="p-2 rounded text-gray-300 hover:bg-green-500 hover:text-white"
                title="ログアウト"
                onClick={() => handleLogoutClick()}
              >
                <FontAwesomeIcon icon={faRightFromBracket} />
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ManagerHeader;
