import ContentHeader from "../../components/ContentHeader"
import ProjectCard from "../../components/ProjectCard"
import styles from '../page.module.css'

import dummyProjects from '../../projects'

export default function Projects() {
  const projects = dummyProjects;

  return (
    <div>
      <ContentHeader text="Projects (ContentHeader)" />
      <div className={`${styles["project-grid"]}`}>
        {projects.map((project) =>
          <ProjectCard project={project} />
          // can probably refactor the above 
        )}
      </div>
    </div>
  )
}