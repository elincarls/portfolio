import Link from "next/link";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.divider}></div>
      <nav className={styles.col}>
        <Link href="/work">Work</Link>
        <Link href="/me">Me</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/contact">Contact</Link>
      </nav>

      <div className={styles.col}>
        <a href="/cv.pdf" download>CV ↓</a>
      </div>

      <div className={`${styles.col} ${styles.colRight}`}>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
      </div>
    </footer>
  );
}
