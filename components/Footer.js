import Link from "next/link";
import Image from "next/image";
import styles from "./footer.module.css";
import { navLinks } from "@/lib/nav";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.divider}></div>
      <nav className={styles.col}>
        {navLinks.map(link => (
          link.enabled
            ? <Link key={link.href} href={link.href}>{link.label}</Link>
            : <span key={link.href} className={styles.disabled}>{link.label}</span>
        ))}
      </nav>

      <div className={styles.col}>
        <a href="/cv.pdf" download className={styles.link}>
          CV <Image src="/arrow-16.svg" width={16} height={16} alt="" />
        </a>
      </div>

      <div className={`${styles.col} ${styles.colRight}`}>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={styles.link}>
          GitHub <Image src="/arrow-16.svg" width={16} height={16} alt="" className={styles.arrowExternal} />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.link}>
          LinkedIn <Image src="/arrow-16.svg" width={16} height={16} alt="" className={styles.arrowExternal} />
        </a>
      </div>
    </footer>
  );
}
