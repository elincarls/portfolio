"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import styles from "./pageHeader.module.css";
import { navLinks } from "@/lib/nav";

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
    <header className={styles["page-header"]}>
      <nav className={styles["header-menu"]}>
        {navLinks.map((link, i) => (
          link.enabled
            ? <Link key={link.href} href={link.href}>{link.label}{i < navLinks.length - 1 ? "," : ""}</Link>
            : <span key={link.href} className={styles["disabled"]}>{link.label}{i < navLinks.length - 1 ? "," : ""}</span>
        ))}
      </nav>
      <Image src="/logo.svg" alt="" width={48} height={48} className={styles["logo"]} />
    </header>
  );
}
