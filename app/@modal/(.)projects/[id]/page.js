import Modal from "../../../../components/Modal";
import BackNav from "../../../../components/BackNav";
import ProjectDetail from "../../../../components/ProjectDetail";
import "../../../globals.css";

const getProject = async (projectId) => {
  try {
    const res = await fetch(`http://localhost:3000/api/projects/${projectId}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch projects");
    }
    return res.json();
  } catch (error) {
    console.log("Error loading projects", error);
  }
};

export default async function ProjectDetailModal({
  params: { id: projectId },
}) {
  const { project } = await getProject(projectId);

  return (
    <Modal>
      <BackNav />
      <div className={`${["content"]}`}>
        <ProjectDetail project={project} />
      </div>
    </Modal>
  );
}
