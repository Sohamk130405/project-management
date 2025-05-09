import { ReactNode } from "react";

interface OverviewPropertyProps {
  label: string;
  children: ReactNode;
}
const OverviewProperty = ({ children, label }: OverviewPropertyProps) => {
  return (
    <div className="flex items-start gap-x-2">
      <div className="min-w-[100px]">
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
      <div className="flex items-center gap-x-2">{children}</div>
    </div>
  );
};

export default OverviewProperty;
