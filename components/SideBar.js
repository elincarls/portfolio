import Link from "next/link";
import { useSelectedLayoutSegment } from 'next/navigation';
import MenuItem from './MenuItem.js';
import styles from './sidebar.module.css';

export default function SideBar() {
    return (
        <div className={`${styles["sidebar"]}`}>
            <Link href="/">
                <img src="/title-logo.svg" alt="" className={styles.logo} />
            </Link>
            <MenuItem href="/about" text="About me" />
            <MenuItem href="/projects" text="Projects" />
        </div>
    );
}




