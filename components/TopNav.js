"use client";
import Link from "next/link";
import { useState, useRef, useEffect} from "react";
import { usePathname, useRouter } from "next/navigation";
import styles from "./topNav.module.css";

export default function TopNav() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const ref = useRef(); 

  useEffect(() => {
    const handler = (event) => {
      if (
        drawerOpen &&
        ref.current &&
        !ref.current.contains(event.target)
      ) {
        setDrawerOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, [drawerOpen]);

  return (
    <>
      <div className={`${styles["navbar"]}`}>
        <Link href="/">
          <img src="/title-logo-mobile.svg" alt="" className={styles.logo} />
        </Link>
        <button
          className={`${styles["menu-button"]}`}
          onClick={() => setDrawerOpen((prev) => !prev)}
        >
          {" "}
          Menu
        </button>
      </div>
      <div
        className={`${styles["menu"]}`}
        style={{ display: drawerOpen ? "flex" : "none" }}
        ref={ref}
      >
        <Link href="/projects" onClick={() => setDrawerOpen((prev) => !prev)}> Projects </Link>
        <Link href="/about" onClick={() => setDrawerOpen((prev) => !prev)}> About me </Link>
      </div>
    </>
  ); 
}
