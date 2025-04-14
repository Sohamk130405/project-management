import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectSeparator,
  SelectValue,
} from "@/components/ui/select";
import { Folder, ListChecksIcon, User } from "lucide-react";
import { TaskStatus } from "../types";
import { useTaskFilters } from "../hooks/use-task-filters";
import MemberAvatar from "@/features/members/components/member-avatar";
import { useGetMembers } from "@/features/members/api/use-get-members";
import ProjectAvatar from "@/features/projects/components/project-avatar";

interface DataFiltersProps {
  hideProjectFilters?: boolean;
}
const DataFilters = ({ hideProjectFilters }: DataFiltersProps) => {
  const workspaceId = useWorkspaceId();
  const { data: projects, isLoading: isLoadingProjects } = useGetProjects({
    workspaceId,
  });
  const { data: members, isLoading: isLoadingMembers } = useGetMembers({
    workspaceId,
  });

  const isLoading = isLoadingMembers || isLoadingProjects;

  const projectOptions = projects?.documents.map((project) => ({
    value: project.$id,
    label: project.name,
  }));
  const memberOptions = members?.documents.map((member) => ({
    value: member.$id,
    label: member.name,
  }));

  const [{ assigneeId, dueDate, projectId, search, status }, setFilters] =
    useTaskFilters();

  const onStatusChange = (value: string) => {
    if (value === "all") setFilters({ status: null });
    else setFilters({ status: value as TaskStatus });
  };

  const onAssigneeChange = (value: string) => {
    if (value === "all") setFilters({ assigneeId: null });
    else setFilters({ assigneeId: value });
  };
  const onProjectChange = (value: string) => {
    if (value === "all") setFilters({ projectId: null });
    else setFilters({ projectId: value });
  };

  if (isLoading) return null;

  return (
    <div className="flex flex-col lg:flex-row gap-2">
      <Select defaultValue={status ?? undefined} onValueChange={onStatusChange}>
        <SelectTrigger className="w-full lg:w-auto h-8">
          <div className="flex items-center pr-2">
            <ListChecksIcon className="size-4 mr-2" />
            <SelectValue placeholder="All statuses" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All statuses</SelectItem>
          <SelectSeparator />
          <SelectItem value={TaskStatus.BACKLOG}>Backlog</SelectItem>
          <SelectItem value={TaskStatus.IN_PROGRESS}>In Progress</SelectItem>
          <SelectItem value={TaskStatus.IN_REVIEW}>In Review</SelectItem>
          <SelectItem value={TaskStatus.TODO}>Todo</SelectItem>
          <SelectItem value={TaskStatus.DONE}>Done</SelectItem>
        </SelectContent>
      </Select>

      <Select
        defaultValue={assigneeId ?? undefined}
        onValueChange={onAssigneeChange}
      >
        <SelectTrigger className="w-full lg:w-auto h-8">
          <div className="flex items-center pr-2">
            <User className="size-4 mr-2" />
            <SelectValue placeholder="Select Assignee" />
          </div>
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All Assignee</SelectItem>

          {memberOptions?.map((member) => (
            <SelectItem key={member.value} value={member.value}>
              {member.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        defaultValue={projectId ?? undefined}
        onValueChange={onProjectChange}
      >
        <SelectTrigger className="w-full lg:w-auto h-8">
          <div className="flex items-center pr-2">
            <Folder className="size-4 mr-2" />
            <SelectValue placeholder="Select Project" />
          </div>
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All Projects</SelectItem>

          {projectOptions?.map((project) => (
            <SelectItem key={project.value} value={project.value}>
              {project.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default DataFilters;
