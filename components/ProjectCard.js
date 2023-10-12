import styles from './projectcard.module.css'

export default function ProjectCard({ title, description, id }) {
    return (
        <div className={`${styles["project-card"]}`}>
            <h2>{title}</h2>
            <p>{description}</p>
            <p>id: {id}</p>
        </div>
    );
}