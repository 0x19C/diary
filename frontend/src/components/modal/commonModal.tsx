"use client";

import useEscKeyEventHook from "@/hooks/escKeyEventHook";
import { ReactNode, useEffect } from "react";

const Modal = ({
  onClose,
  children = null,
}: Readonly<{
  onClose?: () => void;
  children?: ReactNode | null;
}>) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  useEscKeyEventHook(onClose);

  return (
    <div className="fixed top-0 left-0 w-full h-full z-[11]">
      <div
        className="absolute top-0 left-0 bg-[#00000088] w-full h-full"
        onClick={onClose}
      ></div>
      <div className="absolute flex z-[11] w-full h-full items-center justify-center pointer-events-none">
        <div className="flex flex-col bg-white shadow-xl rounded-lg overflow-hidden pointer-events-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
