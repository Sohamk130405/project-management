import { Models } from "node-appwrite";

export enum TaskStatus {
  BACKLOG = "BACKLOG",
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  IN_REVIEW = "IN_REVIEW",
  DONE = "DONE",
}

export type Task = Models.Document & {
  name: string;
  description?: string;
  projectId: string;
  workspaceId: string;
  assigneeId: string;
  search: string;
  dueDate: string;
  status: TaskStatus;
  position: number;
};

export type TaskPayload = { $id: string; status: TaskStatus; position: number };
