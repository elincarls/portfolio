"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from './sidebar.module.css';

export default function SideBar() {
    const pathname = usePathname();
    return (
        <div className={`${styles["sidebar"]}`}>
            <Link href="/">
                <img src="/title-logo.svg" alt="" className={styles.logo} />
            </Link>

            <Link className={`${styles["menu-item"]} ${pathname == "/projects" ? styles["selected"] : ""}`} href="/projects"> Projects </Link>
            <Link className={`${styles["menu-item"]} ${pathname == "/about" ? styles["selected"] : ""}`} href="/about"> About me </Link>

            <div className={`${styles["social-link-group"]}`}>
                <Link href="https://github.com/elincarls" target="_blank">
                    <img src="/github.svg" alt="" className={styles.socialLogo} />
                </Link>
                <Link href="//www.linkedin.com/in/elincarls" target="_blank">
                    <img src="/linkedin.svg" alt="" className={styles.socialLogo} />
                </Link>
            </div>
        </div>
    );
}
