import Link from "next/link";
import CategoryTag from "./CategoryTag";
import styles from "@/components/projectListItem.module.css";

export default function ProjecListItem({
  slug,
  title,
  tags,
  year,
}) {
  return (
    <Link href={`/work/${slug}`} className={styles["wrapper"]}>
      <h2 className={styles["project-list-item-title"]}>{title}</h2>
      <div className={styles["tag-section"]}>
        {tags?.map((tag, index) => (
          <CategoryTag key={index} label={tag} />
        ))}
      </div>
      <p>{year}</p>
    </Link>
  );
}
