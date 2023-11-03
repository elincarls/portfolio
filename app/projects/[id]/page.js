import ProjectDetailContent from "../../../components/ProjectDetail";
import dummyProjects from "../../../projects"

export default function ProjectDetail({ params: { id } }) {
  const project = dummyProjects.find((p) => p.id === id);

  return (
    <ProjectDetailContent project={project} />
  )
}