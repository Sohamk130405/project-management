import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.tasks)["bulk-update"]["$put"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.tasks)["bulk-update"]["$put"]
>;

export const useBulkUpdateTasks = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.tasks["bulk-update"]["$put"]({
        json,
      });
      if (!response.ok) throw new Error("Failed to update a tasks");
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Tasks updated successfully!");
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
    onError: () => {
      toast.error("Failed to update Tasks. Please try again.");
    },
  });

  return mutation;
};
