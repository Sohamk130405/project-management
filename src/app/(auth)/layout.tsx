"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <main className="bg-neutral-100 min-h-screen">
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className="flex justify-between items-center">
          <Image src="/logo.svg" height={56} width={152} alt="logo" />
          {pathname.includes("sign-in") ? (
            <Button
              variant="secondary"
              onClick={() => router.replace("/sign-up")}
            >
              Sign Up
            </Button>
          ) : (
            <Button
              variant="secondary"
              onClick={() => router.replace("/sign-in")}
            >
              Sign In
            </Button>
          )}
        </nav>

        <div className="flex flex-col items-center justify-center pt-4 md:pt-40">
          {children}
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
