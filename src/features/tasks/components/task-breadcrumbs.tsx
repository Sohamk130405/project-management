import { Project } from "@/features/projects/types";
import { Task } from "../types";
import ProjectAvatar from "@/features/projects/components/project-avatar";
import Link from "next/link";
import { ChevronRightIcon, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useConfirm } from "@/hooks/use-confirm";
import { useDeleteTask } from "../api/use-delete-task";
import { useRouter } from "next/navigation";

interface TaskBreadCrumbsProps {
  project: Project;
  task: Task;
}

const TaskBreadCrumbs = ({ project, task }: TaskBreadCrumbsProps) => {
  const router = useRouter();
  const [ConfirmDialog, confirm] = useConfirm({
    title: "Delete Task",
    message: "This action cannot be undone",
    variant: "destructive",
  });

  const { mutate: deleteTask, isPending: isDeletingTask } = useDeleteTask();

  const handleDelete = async () => {
    const ok = await confirm();
    if (!ok) return;
    deleteTask(
      { param: { taskId: task.$id } },
      {
        onSuccess: () => {
          router.push(`/workspaces/${task.workspaceId}/tasks`);
        },
      }
    );
  };

  return (
    <div className="flex items-center gap-x-2">
      <ConfirmDialog />
      <ProjectAvatar
        name={project.name}
        image={project.imageUrl}
        className="size-6 lg:size-8"
      />
      <Link href={`/workspaces/${task.workspaceId}/projects/${project.$id}`}>
        <p className="text-sm lg:text-lg font-semibold text-muted-foreground hover:opacity-75 transition">
          {project.name}
        </p>
      </Link>
      <ChevronRightIcon className="size-4 lg:size-5 text-muted-foreground" />
      <p className="text-sm lg:text-lg font-semibold">{task.name}</p>
      <Button
        className="ml-auto"
        variant="destructive"
        size="sm"
        disabled={isDeletingTask}
        onClick={handleDelete}
      >
        <TrashIcon className="size-4 lg:mr-2" />{" "}
        <span className="hidden lg:block">Delete Task</span>
      </Button>
    </div>
  );
};

export default TaskBreadCrumbs;
