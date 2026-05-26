import Link from "next/link";
import CategoryTag from "./CategoryTag";
import styles from "@/components/projectListItem.module.css";

export default function ProjecListItem({
  slug,
  title,
  description,
  tags,
  year,
}) {
  return (
    <Link href={`/work/${slug}`} className={styles["wrapper"]}>
      <div className={styles["project-list-item"]}>
        <h2 className={styles["project-list-item-title"]}>{title}</h2>
        <div className={styles["tag-section"]}>
          {tags?.map((tag, index) => (
            <CategoryTag key={index} label={tag} />
          ))}
        </div>
        <p>{year ?? "0000"}</p>
      </div>
    </Link>
  );
}
