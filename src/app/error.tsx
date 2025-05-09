"use client";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ErrorPage = () => {
  return (
    <div className="h-screen flex flex-col gap-y-4 items-center justify-center">
      <AlertTriangle className="size-6" />
      <p className="text-sm">Something went wrong</p>
      <Button variant="secondary">
        <Link href="/">Back To Home</Link>
      </Button>
    </div>
  );
};

export default ErrorPage;
