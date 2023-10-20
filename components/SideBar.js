import Link from "next/link";
import MenuItem from './MenuItem.js';
import styles from './sidebar.module.css';

export default function SideBar() {
    return (
        <div className={`${styles["sidebar"]}`}>
            <Link href="/">
                <img src="/title-logo.svg" alt="" className={styles.logo} />
            </Link>
            <MenuItem href="/projects" text="Projects" />
            <MenuItem href="/my-toolbox" text="My toolbox" />
            {/* <MenuItem href="/blog" text="Blog" /> */}
            <MenuItem href="/about" text="About me" />
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
