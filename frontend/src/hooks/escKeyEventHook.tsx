import { useEffect } from "react";

const useEscKeyEventHook = (handler: (() => void) | undefined) => {
  useEffect(() => {
    const escKeyEventHandler = (event: KeyboardEvent) => {
      if (event.key === "Escape" && handler) {
        handler();
      }
    };
    document.addEventListener("keydown", escKeyEventHandler);
    return () => {
      document.removeEventListener("keydown", escKeyEventHandler);
    };
  });
};

export default useEscKeyEventHook;
