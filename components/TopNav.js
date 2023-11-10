"use client"
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import styles from './topNav.module.css'

export default function TopNav() {
    // const pathname = usePathname();
    const [display, setDisplay] = useState(false);

    return (
        <>
            <div className={`${styles["navbar"]}`}>
            <Link href="/">
                <img src="/title-logo-mobile.svg" alt="" className={styles.logo} />
            </Link>
                <button className={`${styles["menu-button"]}`} onClick={() => setDisplay((prevDisplay) => !prevDisplay)}> Menu</button>
            </div>
            <div className={`${styles["menu"]}`} style={{ display: display ? "flex" : "none" }}>
                <Link href="/projects"> Projects </Link>
                <Link href="/about"> About me </Link>
            </div>
        </>
    );
}
