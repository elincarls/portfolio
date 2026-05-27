import React from "react";
import ProjectListItem from "@/components/ProjectListItem";
import Divider from "@/components/Divider";
import Image from "next/image";
import styles from "./page.module.css";
import { dbConnect } from "@/lib/db";
import Project from "@/app/schemas/Project";

async function getAllProjects() {
  await dbConnect();
  return Project.find({});
}

const Work = async () => {
  const data = await getAllProjects();

  return (
    <div className={styles["layout-container"]}>
      <Image
        src="/temp_waves.svg"
        alt="Work header image"
        width={1200}
        height={600}
        style={{ width: "100%", height: "auto" }}
      />

      <div className={styles["project-list"]}>
        {data.map((project, i) => (
          <React.Fragment key={project._id}>
            {i > 0 && <Divider />}
            <ProjectListItem
              slug={project.slug}
              title={project.title}
              description={project?.description}
              tags={project?.tags}
              year={project?.year}
            />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Work;