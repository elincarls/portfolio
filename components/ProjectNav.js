"use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from './projectnav.module.css';
import { arrowMask } from '@/lib/arrowMask';

// Truncates the title to the CSS line clamp and appends an ellipsis manually,
// so the "…" is reliable even where the CSS line-clamp ellipsis isn't (e.g.
// right-aligned text). The CSS clamp on .title-inner stays as the pre-JS
// fallback and defines the height this measures against (--title-lines).
function ClampedTitle({ title }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(title);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fit = () => {
      // Always measure against the full title.
      el.textContent = title;
      if (el.scrollHeight <= el.clientHeight) {
        setDisplay(title);
        return;
      }
      // Binary-search the longest prefix that fits once "…" is appended.
      let lo = 0;
      let hi = title.length;
      while (lo < hi - 1) {
        const mid = (lo + hi) >> 1;
        el.textContent = title.slice(0, mid).trimEnd() + '…';
        if (el.scrollHeight > el.clientHeight) hi = mid;
        else lo = mid;
      }
      const result = title.slice(0, lo).trimEnd() + '…';
      el.textContent = result; // keep the DOM correct even if state is unchanged
      setDisplay(result);
    };

    fit();

    // Re-fit when the available width changes (e.g. crossing the breakpoint).
    // Observe the parent so our own text mutations don't retrigger it.
    const ro = new ResizeObserver(fit);
    if (el.parentElement) ro.observe(el.parentElement);
    return () => ro.disconnect();
  }, [title]);

  return (
    <span ref={ref} className={styles["title-inner"]}>
      {display}
    </span>
  );
}

export default function ProjectNav({ prev, next }) {
  const [bottomOffset, setBottomOffset] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 740px)');
    const thresholds = Array.from({ length: 21 }, (_, i) => i / 20);
    let observer = null;

    const detach = () => {
      observer?.disconnect();
      observer = null;
      setBottomOffset(0);
    };

    const sync = () => {
      detach();
      if (!mq.matches) return;
      const footer = document.querySelector('footer');
      if (!footer) return;
      observer = new IntersectionObserver(
        ([entry]) => setBottomOffset(entry.isIntersecting ? entry.intersectionRect.height : 0),
        { threshold: thresholds }
      );
      observer.observe(footer);
    };

    sync();
    mq.addEventListener('change', sync);
    return () => {
      mq.removeEventListener('change', sync);
      detach();
    };
  }, []);

  if (!prev && !next) return null;

  return (
    <nav
      className={styles["nav"]}
      style={bottomOffset > 0 ? { bottom: bottomOffset } : undefined}
    >
      {prev ? (
        <Link href={`/work/${prev.slug}`} className={`${styles["item"]} ${styles["prev"]}`}>
          <span className={`${styles["arrow"]} ${styles["arrow-left"]}`} style={arrowMask} aria-hidden="true" />
          <span className={styles["title"]}>
            <ClampedTitle key={prev.title} title={prev.title} />
          </span>
        </Link>
      ) : (
        <span className={styles["spacer"]} aria-hidden="true" />
      )}
      {next ? (
        <Link href={`/work/${next.slug}`} className={`${styles["item"]} ${styles["next"]}`}>
          <span className={styles["title"]}>
            <ClampedTitle key={next.title} title={next.title} />
          </span>
          <span className={`${styles["arrow"]} ${styles["arrow-right"]}`} style={arrowMask} aria-hidden="true" />
        </Link>
      ) : (
        <span className={styles["spacer"]} aria-hidden="true" />
      )}
    </nav>
  );
}
