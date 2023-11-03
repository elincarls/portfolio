import Modal from "../../../../components/Modal";
import ProjectDetail from "../../../../components/ProjectDetail";
import dummyProjects from "../../../../projects";

export default function ProjectDetailModal({ params: { id: projectId } }) {
  const projects = dummyProjects;
  const project = projectId && projects.find((p) => p.id === projectId);

  return (
    <Modal>
      <ProjectDetail project={project} />
    </Modal>
  );
}
