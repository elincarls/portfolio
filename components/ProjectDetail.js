import Image from "next/image"
import ContentHeader from "./ContentHeader"
import styles from './projectdetail.module.css'
import '@/app/globals.css'

export default function ProjectDetail({ project }) {

  return (
    <>
      <ContentHeader text={`${project.title}`} />
      <h3 className={`${styles["section-header"]}`} >TL;DR</h3>
      <p>{project.tldr}</p>

      {project.sections.map((section, index) => (
        <div key={index}>

          {section.sectionType === 'paragraph' ? (
            <>
              {section.header !== '' ? (
                <h3 className={`${styles["section-header"]}`}>{section.header}</h3>
              ) : null}
              <div className={`${["paragraphs"]}`}>
                {section.body.map((paragraph, pIndex) => (
                  <p key={pIndex}> {paragraph} </p>
                ))}
              </div>
            </>

          ) : section.sectionType === 'image' ? (
            <>
              <div className={`${styles["img-wrapper"]}`}>
                <Image
                  src={section.link}
                  alt={section.alt}
                  fill
                  style={{ objectFit: 'contain' }}
                  sizes="100vw"
                />
              </div>
              <p>{section.caption}</p>
            </>

          ) : section.sectionType === 'bullet-list' ? (
            <ul>
              {section.body.map((bullet, bIndex) => (
                <li key={bIndex}> {bullet} </li>
              ))}
            </ul>
          ) : null}

        </div>
      ))}
    </>
  );
}