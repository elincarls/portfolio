import Link from "next/link"
import styles from './menuitem.module.css';

export default function MenuItem({ text, href }) {
    return (
        <Link className={`${styles["menu-item"]}`} href={href}> {text} </Link>
    );
}