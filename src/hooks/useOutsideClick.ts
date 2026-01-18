import { useEffect } from "react";

export const useOutsideClick = <T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  cb: () => void
) => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node | null;

      if (!ref.current || !target) return;

      if (!ref.current.contains(target)) {
        cb();
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref, cb]);
};
