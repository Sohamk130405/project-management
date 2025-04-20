import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useCurrent = () => {
  const query = useQuery({
    queryKey: ["current"],
    queryFn: async () => {
      const response = await client.api.auth.current["$get"]();
      if (!response.ok) {
        throw new Error("Failed to fetch current user");
      }
      const data = await response.json();
      return data;
    },
  });
  return query;
};
