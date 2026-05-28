"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import styles from "./pageHeader.module.css";
import { navLinks } from "@/lib/nav";
import NavLink from "./NavLink";

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
          <span key={link.href} className={styles["nav-item"]}>
            {link.enabled
              ? <NavLink href={link.href}>{link.label}</NavLink>
              : <span className={styles["disabled"]}>{link.label}</span>
            }{i < navLinks.length - 1 ? "," : ""}
          </span>
        ))}
      </nav>
      <Image src="/logo.svg" alt="" width={48} height={48} className={styles["logo"]} />
    </header>
  );
}
