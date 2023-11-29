import Modal from "../../../../components/Modal";
import BackNav from "../../../../components/BackNav";
import ProjectDetail from "../../../../components/ProjectDetail";
import "../../../globals.css";
import projectsJSON from "../../../../db/projects.json";

export async function generateStaticParams() {
  return projectsJSON.projects.map((p) => ({
    id: p.id.toString(),
  }));
}

export default async function ProjectDetailModal({
  params: { id: projectId },
}) {
  const project = projectsJSON.projects.find(
    (p) => p.id.toString() === projectId
  );
  if (!project) {
    notFound();
  }

  return (
    <Modal>
      <BackNav />
      <div className={`${["content"]}`}>
        <ProjectDetail project={project} />
      </div>
    </Modal>
  );
}
