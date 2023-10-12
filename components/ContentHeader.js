import styles from './contentheader.module.css';

export default function ContentHeader({ text }) {
    return (
        <h1 className={`${styles["page-header"]}`}> {text} </h1>
    );
}