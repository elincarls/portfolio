import styles from "./footer.module.css";
import { navLinks } from "@/lib/nav";
import NavLink from "./NavLink";

const arrowMask = {
  WebkitMaskImage: "url(/arrow-16.svg)",
  maskImage: "url(/arrow-16.svg)",
};

export default function Footer() {
  return (
    <footer className={styles["footer"]}>
      <div className={styles["divider"]}></div>
      <nav className={styles["col"]}>
        {navLinks.map((link) =>
          link.enabled ? (
            <NavLink key={link.href} href={link.href}>
              {link.label}
            </NavLink>
          ) : (
            <span key={link.href} className={styles["disabled"]}>
              {link.label}
            </span>
          ),
        )}
      </nav>

      <div className={styles["col"]}>
        <a
          href="https://vpvotytzcjxxr9vb.public.blob.vercel-storage.com/cv/elin_carlsson_cv_2026.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className={styles["link"]}
        >
          CV
          <span
            className={styles["arrow"]}
            style={arrowMask}
            aria-hidden="true"
          />
        </a>
      </div>

      <div className={`${styles["col"]} ${styles["col-right"]}`}>
        <a
          href="https://github.com/elincarls"
          target="_blank"
          rel="noopener noreferrer"
          className={styles["link"]}
        >
          GitHub{" "}
          <span
            className={`${styles["arrow"]} ${styles["arrow-external"]}`}
            style={arrowMask}
            aria-hidden="true"
          />
        </a>
        <a
          href="https://www.linkedin.com/in/elincarls"
          target="_blank"
          rel="noopener noreferrer"
          className={styles["link"]}
        >
          LinkedIn{" "}
          <span
            className={`${styles["arrow"]} ${styles["arrow-external"]}`}
            style={arrowMask}
            aria-hidden="true"
          />
        </a>
      </div>
    </footer>
  );
}
