import Link from "next/link"
import styles from './sidebar.module.css';

export default function SideBar() {
    return (
        <div className={`${styles.sidebar}`}>
            <Link href="/about">About</Link>
            <Link href="/projects">Projects</Link>
        </div>
    );
}




