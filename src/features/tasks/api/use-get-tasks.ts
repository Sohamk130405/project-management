import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";
import { TaskStatus } from "../types";
interface UseGetTasksProps {
  workspaceId: string;
  projectId?: string | null;
  assigneeId?: string | null;
  dueDate?: string | null;
  status?: TaskStatus | null;
  search?: string | null;
}

export const useGetTasks = ({
  workspaceId,
  assigneeId,
  dueDate,
  projectId,
  status,
  search,
}: UseGetTasksProps) => {
  const query = useQuery({
    queryKey: [
      "tasks",
      workspaceId,
      projectId,
      assigneeId,
      dueDate,
      status,
      search,
    ],
    queryFn: async () => {
      const response = await client.api.tasks["$get"]({
        query: {
          workspaceId,
          projectId: projectId ?? undefined,
          assigneeId: assigneeId ?? undefined,
          dueDate: dueDate ?? undefined,
          status: status ?? undefined,
          search: search ?? undefined,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch tasks");
      const { data } = await response.json();
      return data;
    },
  });
  return query;
};
