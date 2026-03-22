import ContentHeader from "../../../components/ContentHeader";
import styles from "./../page.module.css";
import "../../globals.css";

export default async function AboutMe() {
  return (
    <div className={`${styles["about-me"]}`}>
      <ContentHeader text="About me" />
      {/*  <div className={`${["paragraphs"]}`}>
                {content.map((paragraph, pIndex) => (
                  <p key={pIndex} className={pIndex === 0 ? `${styles["ingress"]}`: ''}> {paragraph} </p>
                ))}
              </div> 
      */}
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
