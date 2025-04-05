import { getCurrent } from "@/features/auth/queries";
import JoinWorkspaceForm from "@/features/workspaces/components/join-workspace-form";
import { getWorkspaceInfo } from "@/features/workspaces/queries";
import { redirect } from "next/navigation";

const WorkspaceIdJoinPage = async ({
  params: { workspaceId },
}: {
  params: { workspaceId: string };
}) => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  const workspace = await getWorkspaceInfo({ workspaceId });
  if (!workspace) redirect("/");

  return (
    <div className="w-full lg:max-w-xl">
      <JoinWorkspaceForm name={workspace} />
    </div>
  );
};

export default WorkspaceIdJoinPage;
