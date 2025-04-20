import { getCurrent } from "@/features/auth/queries";

import { redirect } from "next/navigation";
import JoinWorkspaceClient from "./client";

const WorkspaceIdJoinPage = async () => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  return <JoinWorkspaceClient />;
};

export default WorkspaceIdJoinPage;
