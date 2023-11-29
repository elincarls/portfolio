import ContentHeader from "../../components/ContentHeader";
import styles from "./../page.module.css";
import "../globals.css";

export default function AboutMe() {
  return (
    <div className={`${styles["about-me"]}`}>
      <ContentHeader text="About me" />
      <div className={`${["paragraphs"]}`}>
        <p>
        Lorem ipsum dolor sit amet consectetur. Eu urna tellus volutpat justo vel neque molestie euismod.
        </p>
      </div>
      <a
        className={`${styles["filled-btn"]}`}
        href="/elin_carlsson_CV_en_20231127.pdf"
        target="_blank"
      >
        Download CV
      </a>
    </div>
  );
}
