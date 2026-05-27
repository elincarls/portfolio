"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./navlink.module.css";

export default function NavLink({ href, children }) {
  const pathname = usePathname();
  const isActive = pathname?.startsWith(href);

  return (
    <Link
      href={href}
      className={`${styles["nav-link"]}${isActive ? ` ${styles["active"]}` : ""}`}
    >
      {children}
    </Link>
  );
}
