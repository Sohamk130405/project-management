import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.tasks)[":taskId"]["$patch"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.tasks)[":taskId"]["$patch"]
>;

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json, param }) => {
      const response = await client.api.tasks[":taskId"]["$patch"]({
        json,
        param,
      });
      if (!response.ok) throw new Error("Failed to update a task");
      return await response.json();
    },
    onSuccess: ({ data }) => {
      toast.success("Task updated successfully!");
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
      queryClient.invalidateQueries({
        queryKey: ["task", data.$id],
      });
      queryClient.invalidateQueries({
        queryKey: ["project-analytics"],
      });
      queryClient.invalidateQueries({
        queryKey: ["workspace-analytics"],
      });
    },
    onError: () => {
      toast.error("Failed to update Task. Please try again.");
    },
  });

  return mutation;
};
