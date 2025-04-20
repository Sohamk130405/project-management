"use client";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface PageErrorProps {
  message: string;
}

const PageError = ({ message = "Something went wrong" }: PageErrorProps) => {
  return (
    <div className="flex flex-col gap-y-2 items-center justify-center h-[486px]">
      <AlertTriangle className="size-10 text-muted-foreground mb-2" />
      <p className="text-sm font-medium text-muted-foreground">{message}</p>
      <Button variant="secondary">
        <Link href="/">Back To Home</Link>
      </Button>
    </div>
  );
};

export default PageError;
