import { z } from "zod";
import { TaskStatus } from "./types";

export const createTaskSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Task name is required")
    .max(256, "Maximum 256 characters allowed"),
  status: z.nativeEnum(TaskStatus, { required_error: "Status is required" }),
  description: z.string().trim().optional(),
  workspaceId: z.string().trim().min(1, "WorkspaceId is required"),
  projectId: z.string().trim().min(1, "ProjectId is required"),
  assigneeId: z.string().trim().min(1, "AssigneeId is required"),
  dueDate: z.coerce.date(),
});
