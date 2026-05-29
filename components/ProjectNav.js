import Link from 'next/link';
import styles from './projectnav.module.css';

const arrowMask = { WebkitMaskImage: "url(/arrow-16.svg)", maskImage: "url(/arrow-16.svg)" };

export default function ProjectNav({ prev, next }) {
  if (!prev && !next) return null;

  return (
    <nav className={styles["nav"]}>
      {prev && (
        <Link href={`/work/${prev.slug}`} className={`${styles["item"]} ${styles["item-prev"]}`}>
          <span className={`${styles["arrow"]} ${styles["arrow-left"]}`} style={arrowMask} aria-hidden="true" />
          <span className={styles["title"]}><span className={styles["title-inner"]}>{prev.title}</span></span>
        </Link>
      )}
      {next && (
        <Link href={`/work/${next.slug}`} className={`${styles["item"]} ${styles["item-next"]}`}>
          <span className={styles["title"]}><span className={styles["title-inner"]}>{next.title}</span></span>
          <span className={`${styles["arrow"]} ${styles["arrow-right"]}`} style={arrowMask} aria-hidden="true" />
        </Link>
      )}
    </nav>
  );
}
