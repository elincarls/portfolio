import Image from "next/image";
import { dbConnect } from "@/lib/db";
import Site from "@/app/schemas/Site";
import styles from "./page.module.css";

export const revalidate = 60;

async function getMeContent() {
  await dbConnect();
  const site = await Site.findOne({}).lean();
  return site?.me;
}

export default async function Me() {
  const me = await getMeContent();

  return (
    <div className={styles["layout"]}>
      <div className={styles["content"]}>
        <h1 className={styles["heading"]}>{me?.header ?? "Design Lead"}</h1>
        {me?.body?.length > 0 && (
          <div className={`paragraphs ${styles["text-column"]}`}>
            {me.body.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        )}
      </div>
      <div className={styles["image-wrapper"]}>
        <Image src="/mountain-480.svg" alt="" width={545} height={726} />
      </div>
    </div>
  );
}
