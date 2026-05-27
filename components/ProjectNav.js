import Link from 'next/link';
import Image from 'next/image';
import styles from './projectnav.module.css';

export default function ProjectNav({ prev, next }) {
  if (!prev && !next) return null;

  return (
    <nav className={styles["nav"]}>
      {prev && (
        <Link href={`/work/${prev.slug}`} className={styles["item"]}>
          <Image src="/arrow-left.svg" alt="" width={16} height={16} aria-hidden="true" />
          <span className={styles["title"]}>{prev.title}</span>
        </Link>
      )}
      {next && (
        <Link href={`/work/${next.slug}`} className={styles["item"]}>
          <span className={styles["title"]}>{next.title}</span>
          <Image src="/arrow-left.svg" alt="" width={16} height={16} className={styles["arrow-right"]} aria-hidden="true" />
        </Link>
      )}
    </nav>
  );
}
