import styles from './categorytag.module.css'

export default function CategoryTag({ label }) {
    return (
        <div className={`${styles["cat-tag"]}`}> {label} </div>
    );
}