import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.workspaces)[":workspaceId"]["reset-invite-code"]["$put"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.workspaces)[":workspaceId"]["reset-invite-code"]["$put"]
>;

export const useResetInviteCode = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.workspaces[":workspaceId"][
        "reset-invite-code"
      ]["$put"]({
        param,
      });
      if (!response.ok) throw new Error("Failed to put workspace");
      return await response.json();
    },
    onSuccess: ({ data }) => {
      toast.success("Invite code reset successfully!");
      queryClient.invalidateQueries({
        queryKey: ["workspaces"],
      });
      queryClient.invalidateQueries({
        queryKey: ["workspace", data.$id],
      });
    },
    onError: () => {
      toast.error("Failed to reset invite code. Please try again.");
    },
  });

  return mutation;
};
