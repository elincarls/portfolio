import Image from "next/image";
import { dbConnect } from "@/lib/db";
import Site from "@/app/schemas/Site";
import ContactForm from "./ContactForm";
import styles from "./contact.module.css";

async function getContactContent() {
  await dbConnect();
  const site = await Site.findOne({}).lean();
  return site?.contact;
}

export default async function Contact() {
  const contact = await getContactContent();

  return (
    <div className={styles["layout"]}>
      <div className={styles["page"]}>
        <h1 className={styles["heading"]}>{contact?.header}</h1>
        <p className={styles["subheading"]}>{contact?.subheader}</p>
        <ContactForm />
      </div>
      <div className={styles["image-wrapper"]}>
        <Image src="/temp_moka.svg" alt="" width={449} height={775} style={{ height: "75%", width: "auto", maxWidth: "100%" }} />
      </div>
    </div>
  );
}
