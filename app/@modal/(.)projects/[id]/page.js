import Modal from "../../../../components/Modal";
import dummyProjects from "../../../../projects";

export default function ProjectDetailModal({ params: { id: projectId } }) {
  const projects = dummyProjects;
  const project = projectId && projects.find((p) => p.id === projectId);

  return (
    <Modal text="Hej från modalen"/>
  );
}
