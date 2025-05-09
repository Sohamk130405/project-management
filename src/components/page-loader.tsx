import { Loader } from "lucide-react";

const PageLoader = () => {
  return (
    <div className="flex items-center justify-center h-[486px]">
      <Loader className="size-6 animate-spin text-muted-foreground" />
    </div>
  );
};

export default PageLoader;
