"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import styles from "./pageHeader.module.css";

export default function PageHeader() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (drawerOpen && ref.current && !ref.current.contains(event.target)) {
        setDrawerOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [drawerOpen]);

  return (
    <>
      <div className={`${styles["page-header"]}`}>
        <div className={`${styles["header-menu"]}`}>
          <Link href="/work">Work,</Link>
          <Link href="/me">Me,</Link>
          <Link href="/blog">Blog,</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <Image src="/logo.svg" alt="" width={48} height={48} className={styles.logo} />
      </div>
    </>
  );
}
