import ContentHeader from "../../components/ContentHeader";
import styles from "./../page.module.css";
import "../globals.css";
import aboutmeJSON from '../../db/about-me.json'

export default function AboutMe() {
  const content = aboutmeJSON.aboutMe; 
  return (
    <div className={`${styles["about-me"]}`}>
      <ContentHeader text="About me" />
      <div className={`${["paragraphs"]}`}>
                {content.map((paragraph, pIndex) => (
                  <p key={pIndex}> {paragraph} </p>
                ))}
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
