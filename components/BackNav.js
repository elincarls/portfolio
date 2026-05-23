"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./backnav.module.css";

export default function BackNav() {
  const router = useRouter();

  return (
    <div className={`${styles["back-nav"]}`}>
      <button
        className={`${styles["text-btn"]} ${styles["back-btn"]}`}
        type="button"
        onClick={() => router.back()}
      >
        <Image src="/arrow-left.svg" alt="" width={24} height={24} className={styles.socialLogo} />
        Back to projects
      </button>
  
    <button
      className={`${styles["text-btn"]} ${styles["close-btn"]}`}
      type="button"
      onClick={() => router.back()}
    >
      <Image src="/dismiss.svg" alt="" width={24} height={24} className={styles.socialLogo} />
      Close
    </button>
    </div>

  );
}
