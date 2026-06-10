"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './floatingBanner.module.css';

const DISMISS_KEY = 'bannerDismissed';

export default function FloatingBanner({ banner }) {
  const [visible, setVisible] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(DISMISS_KEY)) setVisible(false);
    setReady(true);
  }, []);

  const dismiss = () => {
    sessionStorage.setItem(DISMISS_KEY, '1');
    setVisible(false);
  };

  if (!ready || !visible || !banner?.enabled) return null;

  const { title, description } = banner;
  if (!title && !description) return null;

  return (
    <div className={styles["banner"]} role="status" aria-live="polite">
      <div className={styles["header"]}>
        {title && <p className={styles["title"]}>{title}</p>}
        <button
          className={styles["dismiss"]}
          type="button"
          onClick={dismiss}
          aria-label="Dismiss banner"
        >
          <Image src="/x.svg" alt="Dismiss" width={16} height={16} className={styles["dismiss-icon"]} />
        </button>
      </div>
      {description && <p className={styles["description"]}>{description}</p>}
    </div>
  );
}
