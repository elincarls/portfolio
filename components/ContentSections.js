import Image from "next/image";
import styles from './contentsections.module.css';

export default function ContentSections({ sections = [] }) {
  return (
    <div className={styles["sections"]}>
      {sections.map((section, index) => (
        <div key={index} className={styles["section"]}>
          {section?.sectionType === 'paragraph' ? (
            <>
              {section.header ? (
                <h2 className={styles["section-header"]}>{section.header}</h2>
              ) : null}
              <div className="paragraphs">
                {section?.body?.map((paragraph, pIndex) => (
                  <p key={pIndex}>{paragraph}</p>
                ))}
              </div>
            </>
          ) : section?.sectionType === 'image' && section.link ? (
            <>
              <div className={styles["img-wrapper"]}>
                <Image
                  src={section.link}
                  alt={section.alt ?? ""}
                  fill
                  style={{ objectFit: 'contain' }}
                  sizes="100vw"
                />
              </div>
              {section.caption && <p>{section.caption}</p>}
            </>
          ) : section?.sectionType === 'bullet-list' ? (
            <ul>
              {section?.body?.map((bullet, bIndex) => (
                <li key={bIndex}>{bullet}</li>
              ))}
            </ul>
          ) : null}
        </div>
      ))}
    </div>
  );
}
