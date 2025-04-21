"use client";

import Analytics from "@/components/analytics";
import DottedSeparator from "@/components/dotted-separator";
import PageError from "@/components/page-error";
import PageLoader from "@/components/page-loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { useGetMembers } from "@/features/members/api/use-get-members";
import MemberAvatar from "@/features/members/components/member-avatar";
import { Member } from "@/features/members/types";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import ProjectList from "@/features/projects/components/project-list";
import { useGetTasks } from "@/features/tasks/api/use-get-tasks";
import TaskList from "@/features/tasks/components/task-list";
import { useGetWorkspaceAnalytics } from "@/features/workspaces/api/use-get-workspace-analytics";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { SettingsIcon } from "lucide-react";
import Link from "next/link";

const WorkspaceIdClient = () => {
  const workspaceId = useWorkspaceId();

  const { data: analytics, isLoading: isAnalyticsLoading } =
    useGetWorkspaceAnalytics({ workspaceId });

  const { data: projects, isLoading: isProjectsLoading } = useGetProjects({
    workspaceId,
  });
  const { data: tasks, isLoading: isTasksLoading } = useGetTasks({
    workspaceId,
  });

  const { data: members, isLoading: isMembersLoading } = useGetMembers({
    workspaceId,
  });

  const isLoading =
    isAnalyticsLoading ||
    isProjectsLoading ||
    isMembersLoading ||
    isTasksLoading;

  if (isLoading) return <PageLoader />;

  const isError = !(analytics && tasks && projects && members);
  if (isError) return <PageError message="Failed to load workspace data" />;

  return (
    <div className="h-full flex flex-col space-y-4">
      <Analytics data={analytics} />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <TaskList data={tasks.documents} total={tasks.total} />
        <ProjectList data={projects.documents} total={projects.total} />
        <MemberList data={members.documents} total={members.total} />
      </div>
    </div>
  );
};

export default WorkspaceIdClient;

const MemberList = ({ data, total }: { data: Member[]; total: number }) => {
  const workspaceId = useWorkspaceId();
  return (
    <div className="flex flex-col gap-y-4 col-span-1">
      <div className="bg-white border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Members ({total})</p>
          <Button size="icon" variant="secondary" asChild>
            <Link href={`/workspaces/${workspaceId}/members`}>
              <SettingsIcon className="size-4 text-neutral-400" />
            </Link>
          </Button>
        </div>
        <DottedSeparator className="my-4" />
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((member) => (
            <li key={member.$id}>
              <Card className="shadow-none rounded-lg overflow-hidden">
                <CardContent className="p-3 flex flex-col items-center gap-x-2">
                  <MemberAvatar name={member.name} className="size-12" />
                  <div className="flex flex-col items-center overflow-hidden">
                    <p className="text-lg font-medium line-clamp-1">
                      {member.name}
                    </p>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {member.email}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
          <li className="text-sm text-muted-foreground text-center hidden first-of-type:block">
            No members found
          </li>
        </ul>
      </div>
    </div>
  );
};
