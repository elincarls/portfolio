"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './projectnav.module.css';

const arrowMask = { WebkitMaskImage: "url(/arrow-16.svg)", maskImage: "url(/arrow-16.svg)" };

export default function ProjectNav({ prev, next }) {
  const [bottomOffset, setBottomOffset] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 740px)');
    if (!mq.matches) return;

    const footer = document.querySelector('footer');
    if (!footer) return;

    const thresholds = Array.from({ length: 21 }, (_, i) => i / 20);
    const observer = new IntersectionObserver(
      ([entry]) => setBottomOffset(entry.intersectionRect.height),
      { threshold: thresholds }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  if (!prev && !next) return null;

  return (
    <nav
      className={styles["nav"]}
      style={bottomOffset > 0 ? { bottom: bottomOffset } : undefined}
    >
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
