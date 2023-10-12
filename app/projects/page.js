import ContentHeader from "../../components/ContentHeader"
import ProjectCard from "../../components/ProjectCard"

import styles from '../page.module.css'

export default function Projects() {

  const projects = [
    { title: "My first project", description: "A description", tags: ["UX", "UI"]},
    { title: "My second project", description: "A second description", tags: ["Research", "UX", "Design system"] },
    { title: "The third project", description: "The third project", tags: ["Code", "Design system"] },
    { title: "Project four", description: "Description four", tags: ["UX"] },
    { title: "My first project", description: "A description", tags: ["Process", "Organisational"] }
  ]

  return (
    <div>
      <ContentHeader text="Projects (ContentHeader)" />
      <div className={`${styles["project-grid"]}`}>
        {projects.map((project, index) =>
          <ProjectCard title={project.title} description={project.description} tags={project.tags} id={index} />
        )}
      </div>
    </div>
  )
}