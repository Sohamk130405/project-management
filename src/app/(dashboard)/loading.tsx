import { LoaderIcon } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <LoaderIcon className="animate-spin size-4 text-muted-foreground" />
    </div>
  );
};

export default Loading;
