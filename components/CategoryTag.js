import styles from './categorytag.module.css'

export default function CategoryTag({ label }) {
    return (
        <span className={styles["cat-tag"]}>{label}</span>
    );
}