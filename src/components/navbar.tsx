"use client";
import UserButton from "@/features/auth/components/user-button";
import React from "react";
import MobileSidebar from "./mobile-sidebar";
import { usePathname } from "next/navigation";

const pathnameMap = {
  tasks: {
    title: "My Tasks",
    desc: "View all your tasks here",
  },
  projects: {
    title: "My Project",
    desc: "View tasks of your projects here",
  },
};

const defaultMap = {
  title: "Home",
  desc: " Monitor all of your projects and tasks here",
};

const Navbar = () => {
  const pathname = usePathname();
  const pathnameParts = pathname.split("/");
  const pathnameKey = pathnameParts[3] as keyof typeof pathnameMap;

  const { title, desc } = pathnameMap[pathnameKey] || defaultMap;
  return (
    <nav className="pt-4 px-6 flex items-center justify-between">
      <div className="flex-col hidden lg:flex">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="text-muted-foreground">{desc}</p>
      </div>
      <MobileSidebar />
      <UserButton />
    </nav>
  );
};

export default Navbar;
