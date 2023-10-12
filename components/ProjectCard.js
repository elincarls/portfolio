import CategoryTag from './CategoryTag'

import styles from './projectcard.module.css'

export default function ProjectCard({ title, description, tags, id }) {
    return (
        <div className={`${styles["project-card"]}`}>
            <div>
                <h2>{title}</h2>
                <p>{description}</p>
                <p>id: {id}</p>
            </div>
            <div className={`${styles["tag-section"]}`}>
                {tags.map((tag) =>
                    <CategoryTag label={tag} />
                )}
            </div>
        </div>
    );
}