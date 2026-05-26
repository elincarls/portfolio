import Image from "next/image";
import styles from "./page.module.css";

const Me = async () => {
  return (
    <div className={styles["layout"]}>
      <div className={styles["content"]}>
        <h1 className={styles["heading"]}>/me</h1>
      </div>
      <div className={styles["image-wrapper"]}>
        <Image src="/temp_mountain.svg" alt="" width={545} height={726} />
      </div>
    </div>
  );
};

export default Me;
