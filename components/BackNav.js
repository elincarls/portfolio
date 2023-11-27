"use client";
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
        <img src="/arrow-left.svg" alt="" className={styles.socialLogo} /> 
        Back to projects
      </button>
  
    <button
      className={`${styles["text-btn"]} ${styles["close-btn"]}`}
      type="button"
      onClick={() => router.back()}
    >
      <img src="/dismiss.svg" alt="" className={styles.socialLogo} /> 
      Close
    </button>
    </div>

  );
}
