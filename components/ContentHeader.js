import styles from './contentheader.module.css';

export default function ContentHeader({ text }) {
    return (
        <div className={`${styles["content-header"]}`}>
            <h1 className={`${["page-header"]}`}> {text} </h1>
        </div>
    );
}