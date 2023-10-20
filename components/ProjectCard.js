import Link from 'next/link';
import CategoryTag from './CategoryTag'

import styles from './projectcard.module.css'

export default function ProjectCard({ project, id }) {
    return (
        <Link href={`/projects/${id}`}>
        <div className={`${styles["project-card"]}`}>
            <div>
                <h2 className={`${styles["card-header"]}`}>{project.title}</h2>
                <p>{project.description}</p>
                <p>id: {project.id}</p>
            </div>
            <div className={`${styles["tag-section"]}`}>
                {project.tags.map((tag, index) =>
                    <CategoryTag key={index} label={tag} />
                )}
            </div>
        </div>
        </Link>
    );
}