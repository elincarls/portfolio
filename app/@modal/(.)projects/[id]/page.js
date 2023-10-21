import Modal from "../../../../components/Modal";
import dummyProjects from "../../../../projects";
import '../../../globals.css'
import Image from 'next/image'

export default function ProjectDetailModal({ params: { id: projectId } }) {
  const projects = dummyProjects;
  const project = projectId && projects.find((p) => p.id === projectId);

  return (
    <Modal>
      <h2 className={`${["page-header"]}`}>{project.title}</h2>
      <h3>TL;DR</h3>
      <p>{project.tldr}</p>

      {project.sections.map((section, index) => (
        <div key={index}>

          {section.type === 'paragraph' ? (
            <>
              {section.header !== '' ? (
                <h3>{section.header}</h3>
              ) : null}
              <div className={`${["paragraphs"]}`}>
                {section.body.map((paragraph, pIndex) => (
                  <p key={pIndex}> {paragraph} </p>
                ))}
              </div>
            </>

          ) : section.type === 'image' ? (
            <>
              <Image
                src={section.link}
                alt="Google Drive Image"
                width={1000}
                height={640}
              />
              <p>Image text: {section.caption}</p>
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
    </Modal>
  );
}
