import { notFound } from "next/navigation";
import CategoryTag from "@/components/CategoryTag";
import Divider from "@/components/Divider";
import ContentSections from "@/components/ContentSections";
import ProjectNav from "@/components/ProjectNav";
import { dbConnect } from "@/lib/db";
import Project, { PROJECT_SORT } from "@/app/schemas/Project";
import styles from "./page.module.css";

async function getProjectData(slug) {
  await dbConnect();
  const project = await Project.findOne({ slug }).lean();
  if (!project) return notFound();
  return project;
}

async function getAdjacentProjects(slug) {
  const ordered = await Project.find({})
    .sort(PROJECT_SORT)
    .select("slug title")
    .lean();
  const i = ordered.findIndex((p) => p.slug === slug);
  if (i === -1) return { prev: null, next: null };
  return {
    prev: i > 0 ? ordered[i - 1] : null,
    next: i < ordered.length - 1 ? ordered[i + 1] : null,
  };
}

const ProjectDetailPage = async ({ params }) => {
  const { slug } = await params;
  const project = await getProjectData(slug);
  const { prev, next } = await getAdjacentProjects(slug);

  return (
    <>
      <div className={`${styles["layout"]} ${!project?.enabled ? styles["disabled"] : ""}`}>
        <h1 className={styles["title"]}>{project?.title}</h1>
        {project?.tags?.length > 0 && (
          <div className={styles["tags"]}>
            {project?.tags?.map((tag, i) => (
              <CategoryTag key={i} label={tag} />
            ))}
          </div>
        )}
        <div className={styles["tldr-section"]}>
          <h2>tl;dr</h2>
          <p>{project?.tldr}</p>
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
