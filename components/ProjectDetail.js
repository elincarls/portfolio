import CategoryTag from "./CategoryTag";
import Divider from "./Divider";
import ContentSections from "./ContentSections";
import styles from "./projectdetail.module.css";

export default function ProjectDetail({ project }) {
  return (
    <div className={styles["layout"]}>
      <h1 className={styles["title"]}>{project.title}</h1>
      {project.tags && project.tags.length > 0 && (
        <div className={styles["tags"]}>
          {project.tags.map((tag, i) => (
            <CategoryTag key={i} label={tag} />
          ))}
        </div>
      )}
      <div className={styles["tldr-section"]}>
        <h2>tl;dr</h2>
        <p>{project.tldr}</p>
        <Divider className={styles["tldr-divider"]} />
      </div>
      <ContentSections sections={project.sections} />
    </div>
  );
}
