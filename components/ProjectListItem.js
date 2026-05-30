import Link from "next/link";
import CategoryTag from "./CategoryTag";
import styles from "@/components/projectListItem.module.css";

export default function ProjectListItem({
  slug,
  title,
  tags,
  year,
  enabled = true,
}) {
  const content = (
    <>
      <h2 className={styles["project-list-item-title"]}>
        {title}
        {year && <span className={styles["year"]}>{year}</span>}
      </h2>
      <div className={styles["tag-section"]}>
        {tags?.map((tag, index) => (
          <CategoryTag key={index} label={tag} />
        ))}
      </div>
    </>
  );

  if (!enabled) {
    return (
      <div className={`${styles["wrapper"]} ${styles["disabled"]}`} aria-disabled="true">
        {content}
      </div>
    );
  }

  return (
    <Link href={`/work/${slug}`} className={`${styles["wrapper"]} ${styles["enabled"]}`}>
      {content}
    </Link>
  );
}
