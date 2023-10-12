import ContentHeader from "../../components/ContentHeader"
import ProjectCard from "../../components/ProjectCard"

import styles from '../page.module.css'

export default function Projects() {

  const projects = [
    { title: "My first project", description: "A description" },
    { title: "My second project", description: "A second description" },
    { title: "The third project", description: "The third project" },
    { title: "Project four", description: "Description four" },
    { title: "My first project", description: "A description" },
    { title: "My second project", description: "A second description" },
    { title: "The third project", description: "The third project" },
    { title: "Project four", description: "Description four" }
  ]

  return (
    <div>
      <ContentHeader text="Projects (ContentHeader)" />
      <div className={`${styles["project-grid"]}`}>
        {projects.map((project, index) =>
          <ProjectCard title={project.title} description={project.description} id={index} />
        )}
      </div>
    </div>
  )
}