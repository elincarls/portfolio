"use client";
import { useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./modal.module.css"

export default function Modal({ children }) {
  const backdrop = useRef();
  const wrapper = useRef();
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  const onClick = useCallback(
    (e) => {
      if (e.target === backdrop.current || e.target === wrapper.current) {
        if (onDismiss) onDismiss();
      }
    },
    [onDismiss, backdrop, wrapper]
  );

  const onKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onDismiss();
    },
    [onDismiss]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    document.body.classList.add("no-scroll");
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("no-scroll");
    };
  }, [onKeyDown]);

  return (
    <div
      ref={backdrop}
      className={`${styles["modal-backdrop"]}`}
      onClick={onClick}
    >
      <div
        ref={wrapper}
        className={`${styles["modal-wrapper"]}`}
      >
        <div className={`${styles["modal"]}`}
        >

          {children}

        </div>
      </div>
    </div>
  );
}
