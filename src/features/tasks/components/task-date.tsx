import { cn } from "@/lib/utils";
import { differenceInDays, format } from "date-fns";

const TaskDate = ({
  value,
  className,
}: {
  value: string;
  className?: string;
}) => {
  const today = new Date();
  const endDate = new Date(value);
  const diffInDays = differenceInDays(endDate, today);

  const textColor =
    diffInDays <= 3
      ? "text-red-500"
      : diffInDays <= 7
      ? "text-orange-500"
      : diffInDays <= 14
      ? "text-yellow-500"
      : "text-muted-foreground";

  return (
    <div className={textColor}>
      <span className={cn("truncate", className)}>{format(value, "PPP")}</span>
    </div>
  );
};

export default TaskDate;
