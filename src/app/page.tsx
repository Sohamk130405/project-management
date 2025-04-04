"use client";

import { Button } from "@/components/ui/button";
import { useCurrent } from "@/features/auth/api/use-current";
import { useLogout } from "@/features/auth/api/use-logout";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Home = () => {
  const { data, isLoading } = useCurrent();
  const { mutate } = useLogout();
  const router = useRouter();
  useEffect(() => {
    if (!data && !isLoading) router.push("/sign-in");
  }, [data, isLoading, router]);

  return (
    <div className="flex gap-4">
      {!isLoading && data && (
        <>
          <h1>User: {data?.name}</h1>
          <Button variant="destructive" onClick={() => mutate()}>
            Logout
          </Button>
        </>
      )}
    </div>
  );
};

export default Home;
