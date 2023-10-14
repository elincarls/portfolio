import ContentHeader from "../../../components/ContentHeader"
import dummyProjects from "../../../projects"

export default function ProjectDetail({ params: {id}}) {
  const project = dummyProjects.find((p) => p.id === id);

  return (
    <div>
      <ContentHeader 
      text={project.title} />
      <p>{project.short_description}</p>
    </div>
  )
}