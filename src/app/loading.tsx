"use client";
import { Loader2 } from "lucide-react";

const LoadingPage = () => {
  return (
    <div className="h-screen flex flex-col gap-y-4 items-center justify-center">
      <Loader2 className="size-6 animate-spin text-muted-foreground" />
      <p className="text-sm">Loading, please wait...</p>
    </div>
  );
};

export default LoadingPage;
