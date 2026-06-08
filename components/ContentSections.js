import Image from "next/image";
import styles from './contentsections.module.css';

function isValidImageSrc(link) {
  if (typeof link !== "string") return false;
  const src = link.trim();
  return src.startsWith("http") || src.startsWith("/");
}

export default function ContentSections({ sections = [] }) {
  const items = Array.isArray(sections) ? sections : [];
  return (
    <div className={styles["sections"]}>
      {items.map((section, index) => (
        <div key={index} className={styles["section"]}>
          {section?.sectionType === 'paragraph' ? (
            <>
              {section.header ? (
                <h2 className={styles["section-header"]}>{section.header}</h2>
              ) : null}
              <div className="paragraphs">
                {(Array.isArray(section?.body) ? section.body : []).map((paragraph, pIndex) => (
                  <p key={pIndex}>{paragraph}</p>
                ))}
              </div>
            </>
          ) : section?.sectionType === 'image' ? (
            <>
              <div className={styles["img-wrapper"]}>
                {isValidImageSrc(section.link) ? (
                  <Image
                    className={styles["img"]}
                    src={section.link}
                    alt={section.alt ?? ""}
                    width={section.width}
                    height={section.height}
                    sizes="100vw"
                  />
                ) : (
                  <div
                    className={styles["img-fallback"]}
                    role="img"
                    aria-label={section.alt || "Image unavailable"}
                  >
                    <span>{section.alt || "Image unavailable"}</span>
                  </div>
                )}
              </div>
              {section.caption && <figcaption>{section.caption}</figcaption>}
            </>
          ) : section?.sectionType === 'bullet-list' ? (
            <ul>
              {(Array.isArray(section?.body) ? section.body : []).map((bullet, bIndex) => (
                <li key={bIndex}>{bullet}</li>
              ))}
            </ul>
          ) : null}
        </div>
      ))}
    </div>
  );
}
