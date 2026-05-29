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
    <div className={styles["layout-container"]}>
      <h1 className={styles["heading"]}>{contact?.header}</h1>
      <p className={styles["subheading"]}>{contact?.subheader}</p>
      <ContactForm />
    </div>
  );
}
