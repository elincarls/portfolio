import ProjectDetailContent from "../../../components/ProjectDetail";

const getProject = async (projectId) => {
  try {
    const res = await fetch(`http://localhost:3000/api/projects/${projectId}`, { cache: 'no-store', });
    if (!res.ok) {
      throw new Error("Failed to fetch projects");
    }
    return res.json();
  } catch (error) {
    console.log("Error loading projects", error)
  }
}

export default async function ProjectDetail({ params: { id: projectId } }) {
  const { project } = await getProject(projectId);

  return (
    <div>
      <ProjectDetailContent project={project} />
    </div>
  )
}