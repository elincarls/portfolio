import { notFound } from "next/navigation";
import ProjectDetailContent from "@/components/ProjectDetail";
import { dbConnect } from "@/lib/db";
import Project from "@/app/schemas/Project";

async function getProjectData(slug) {
  await dbConnect();
  const project = await Project.findOne({ slug });
  if (!project) return notFound();
  return project;
}

const ProjectDetail = async ({ params }) => {
  const { slug } = await params;
  const projectData = await getProjectData(slug);

  return (
    <div>
      <ProjectDetailContent project={projectData} />
    </div>
  )
}

export default ProjectDetail;