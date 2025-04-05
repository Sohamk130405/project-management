"use client";

import { RiAddCircleFill } from "react-icons/ri";
import { useGetProjects } from "../api/use-get-projects";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useCreateProjectModal } from "../hooks/use-create-project-modal";
import ProjectAvatar from "./project-avatar";

const Projects = () => {
  const { open } = useCreateProjectModal();
  const pathname = usePathname();
  const workspaceId = useWorkspaceId();
  const { data } = useGetProjects({ workspaceId });
  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase text-neutral-500">Projects</p>
        <RiAddCircleFill
          onClick={open}
          className="size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition"
        />
      </div>
      {data?.documents.map((project) => {
        const isActive = pathname.includes(project.$id);
        const href = `/workspaces/${workspaceId}/projects/${project.$id}`;
        return (
          <Link
            key={project.$id}
            href={href}
            className={cn(
              "flex items-center gap-2.5 p-2.5 rounded-md hover:opacity-75 transition cursor-pointer",
              isActive && "bg-white shadow-sm hover:opacity-100 text-primary"
            )}
          >
            <ProjectAvatar name={project.name} image={project.imageUrl} />
            <span className="truncate">{project.name}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default Projects;
