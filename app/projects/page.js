import ContentHeader from "../../components/ContentHeader"
import ProjectCard from "../../components/ProjectCard"
import styles from '../page.module.css'

const getProjects = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/projects', { cache: 'no-store', });
    if (!res.ok) {
      throw new Error("Failed to fetch projects");
    }
    return res.json();
  } catch (error) {
    console.log("Error loading projects", error)
  }
}

export default async function Projects() {
  const { projects } = await getProjects();

  return (
    <div>
      <ContentHeader text="Projects" />
      <div className={`${styles["project-grid"]}`}>
        {projects.map(project =>
          <ProjectCard
            key={project._id}
            id={project._id}
            title={project.title}
            description={project.description}
            tags={project.tags}
          />
        )}
      </div>
    </div>
  )
}