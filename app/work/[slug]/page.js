import { notFound } from "next/navigation";
import CategoryTag from "@/components/CategoryTag";
import Divider from "@/components/Divider";
import ContentSections from "@/components/ContentSections";
import ProjectNav from "@/components/ProjectNav";
import { dbConnect } from "@/lib/db";
import Project from "@/app/schemas/Project";
import styles from "./page.module.css";

async function getProjectData(slug) {
  await dbConnect();
  const project = await Project.findOne({ slug }).lean();
  if (!project) return notFound();
  return project;
}

async function getAdjacentProjects(projectId) {
  const [prev, next] = await Promise.all([
    Project.findOne({ _id: { $lt: projectId } }).sort({ _id: -1 }).select("slug title").lean(),
    Project.findOne({ _id: { $gt: projectId } }).sort({ _id: 1 }).select("slug title").lean(),
  ]);
  return { prev, next };
}

const ProjectDetailPage = async ({ params }) => {
  const { slug } = await params;
  const project = await getProjectData(slug);
  const { prev, next } = await getAdjacentProjects(project._id);

  return (
    <>
      <div className={styles["layout"]}>
        <h1 className={styles["title"]}>{project.title}</h1>
        {project.tags && project.tags.length > 0 && (
          <div className={styles["tags"]}>
            {project.tags.map((tag, i) => (
              <CategoryTag key={i} label={tag} />
            ))}
          </div>
        )}
        <div className={styles["tldr-section"]}>
          <h2>tl;dr</h2>
          <p>{project.tldr}</p>
          <Divider />
        </div>
        <ContentSections sections={project.sections} />
      </div>
      <ProjectNav
        prev={prev ? { slug: prev.slug, title: prev.title } : null}
        next={next ? { slug: next.slug, title: next.title } : null}
      />
    </>
  );
}

export default ProjectDetailPage;
