import { LoaderIcon } from "lucide-react";

const Loader = () => {
  return (
    <div className="size-10 rounded-full flex items-center justify-center bg-neutral-200 border border-neutral-300">
      <LoaderIcon className="animate-spin size-4 text-muted-foreground" />
    </div>
  );
};

export default Loader;
