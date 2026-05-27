import { notFound } from "next/navigation";
import ProjectDetailContent from "@/components/ProjectDetail";
import ProjectNav from "@/components/ProjectNav";
import { dbConnect } from "@/lib/db";
import Project from "@/app/schemas/Project";

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

const ProjectDetail = async ({ params }) => {
  const { slug } = await params;
  const projectData = await getProjectData(slug);
  const { prev, next } = await getAdjacentProjects(projectData._id);

  return (
    <>
      <ProjectDetailContent project={projectData} />
      <ProjectNav
        prev={prev ? { slug: prev.slug, title: prev.title } : null}
        next={next ? { slug: next.slug, title: next.title } : null}
      />
    </>
  );
}

export default ProjectDetail;