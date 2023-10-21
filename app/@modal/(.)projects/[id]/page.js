import Modal from "../../../../components/Modal";
import dummyProjects from "../../../../projects";

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
          <h3>{section.header}</h3>
          {section.body.map((paragraph, pIndex) => (
            <p key={pIndex}> {paragraph} </p>
          ))}
        </div>
      ))}
    </Modal>
  );
}
