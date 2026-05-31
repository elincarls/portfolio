"use client";

import { useState } from 'react';
import styles from './floatingBanner.module.css';

export default function FloatingBanner({ banner }) {
  const [visible, setVisible] = useState(true);
  if (!visible || !banner?.enabled) return null;

  const { title, description } = banner;
  if (!title && !description) return null;

  return (
    <div className={styles.banner} role="status" aria-live="polite">
      <div className={styles.header}>
        {title && <p className={styles.title}>{title}</p>}
        <button
          className={styles.dismiss}
          type="button"
          onClick={() => setVisible(false)}
          aria-label="Dismiss banner"
        >
          ×
        </button>
      </div>
      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
}
