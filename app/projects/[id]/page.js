import { notFound } from "next/navigation";
import ProjectDetailContent from "../../../components/ProjectDetail";
import projectsJSON from "../../../db/projects.json";

export async function generateStaticParams() {
  return projectsJSON.projects.map((p) => ({
    id: p.id.toString(),
  }));
}

export default async function ProjectDetail({ 
  params: { id: projectId }, 
}) {

  const project = projectsJSON.projects.find(
    (p) => p.id.toString() === projectId
  );
  if (!project) {
    notFound();
  }

  return (
    <div>
      <ProjectDetailContent project={project} />
    </div>
  );
}
