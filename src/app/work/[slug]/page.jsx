
import React from "react";
import projects from "@/project";
import ProjectClient from "./project-client";

export default async function ProjectPage({ params }) {
  const paramsObj = await params;
const { slug } = paramsObj;
  const project = projects.find((p) => p.slug === slug);

  const currentIndex = projects.findIndex((p)=> p.slug === slug);

  const nextIndex = (currentIndex + 1) % projects.length;
  const prevIndex = (currentIndex -1 + projects.length) % projects.length;

  const nextProject = projects[nextIndex];
  const prevProject = projects[prevIndex];

  return (
    <ProjectClient
      project={project}
      nextProject={nextProject}
      prevProject={prevProject}
    />
  );
}

