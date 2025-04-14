import { parseAsString, parseAsStringEnum, useQueryStates } from "nuqs";
import { TaskStatus } from "../types";

export const useTaskFilters = () => {
  return useQueryStates({
    projectId: parseAsString,
    assigneeId: parseAsString,
    search: parseAsString,
    dueDate: parseAsString,
    status: parseAsStringEnum(Object.values(TaskStatus)),
  });
};
