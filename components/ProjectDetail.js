import styles from './projectdetail.module.css'
import '../app/globals.css'

export default function ProjectDetail({ project }) {

  return (
    <>
      <h2 className={`${["page-header"]}`}>{project.title}</h2>

      {project.sections.map((section, index) => (
        <div key={index}>

          {section.type === 'paragraph' ? (
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

          ) : section.type === 'image' ? (
            <>
              <div className={`${styles["img-wrapper"]}`}>
                <img src={section.link} alt={section.alt} />
                <p><i>{section.caption}</i></p>
              </div>
             
            </>

          ) : section.type === 'bullet-list' ? (
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
