import ContentHeader from "../../components/ContentHeader"
import ProjectCard from "../../components/ProjectCard"
import styles from '../page.module.css'
import projectsJSON from '../../db/projects.json'

export default async function Projects() {
  const projects = projectsJSON.projects; 

  return (
    <>
      <ContentHeader text="Projects" />
      <div className={`${styles["project-grid"]}`}>
        {projects.map(project =>
          <ProjectCard
            key={project.id} 
            id={project.id}
            title={project.title}
            description={project.description}
            tags={project.tags}
          />
        )}
      </div>
    </>
  )
}