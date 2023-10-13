'use client'
import ContentHeader from "../../../components/ContentHeader"
import dummyProjects from "../../../projects"
import { useParams } from "next/navigation"

export default function ProjectDetail() {
  const id = useParams().projectId;
  const project = dummyProjects.find((p) => p.id === id);

  return (
    <div>
      <ContentHeader 
      text={project.title} />
      <p>{project.short_description}</p>
    </div>
  )
}