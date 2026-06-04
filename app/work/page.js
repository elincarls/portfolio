import React from "react";
import ProjectListItem from "@/components/ProjectListItem";
import Divider from "@/components/Divider";
import Image from "next/image";
import styles from "./page.module.css";
import { dbConnect } from "@/lib/db";
import Project from "@/app/schemas/Project";

async function getAllProjects() {
  await dbConnect();
  return Project.find({}).sort({ enabled: -1, year: -1, _id: -1 }).lean();
}

const Work = async () => {
  const data = await getAllProjects();

  return (
    <div className={styles["layout-container"]}>
      <div className={styles["waves-desktop"]}>
        <Image
          className={styles["waves-desktop-img"]}
          src="/waves-1920.svg"
          alt="Blue lines on a white background making an abstract representation of a horizon"
          width={1920}
          height={600}
          style={{ height: "auto" }}
        />
      </div>
      <div className={styles["waves-mobile"]}>
        <Image
          className={styles["waves-mobile-img"]}
          src="/waves-740.svg"
          alt="Blue lines on a white background making an abstract representation of a horizon"
          width={740}
          height={600}
          style={{ height: "auto" }}
        />
      </div>
      <div className={styles["waves-small"]}>
        <Image
          src="/waves-430.svg"
          alt="Blue lines on a white background making an abstract representation of a horizon"
          width={430}
          height={600}
          style={{ width: "100%", height: "auto" }}
        />
      </div>

      <div className={styles["project-list"]}>
        {data.map((project, i) => (
          <React.Fragment key={project._id}>
            {i > 0 && <div className={styles["divider-row"]}><Divider /></div>}
            <ProjectListItem
              slug={project.slug}
              title={project.title}
              description={project?.description}
              tags={project?.tags}
              year={project?.year}
              enabled={project.enabled}
            />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Work;