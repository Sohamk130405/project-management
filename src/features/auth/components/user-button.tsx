"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCurrent } from "../api/use-current";
import Loader from "@/components/loader";
import DottedSeparator from "@/components/dotted-separator";
import { LogOut } from "lucide-react";
import { useLogout } from "../api/use-logout";
import { useRouter } from "next/navigation";

const UserButton = () => {
  const { data: user, isLoading } = useCurrent();
  const { mutate: logout } = useLogout();
  const router = useRouter();
  if (isLoading) return <Loader />;
  if (!user) {
    router.push("/sign-in");
    return null;
  }
  const { name, email } = user;
  const avatarFallback =
    name?.charAt(0).toUpperCase() || email?.charAt(0).toUpperCase() || "U";
  const avatarImage = `https://ui-avatars.com/api/?name=${name}&background=random`;
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none relative">
        <Avatar className="size-10 hover:opacity-75 transition border border-neutral-300">
          <AvatarFallback className="bg-neutral-200 font-medium text-neutral-500 flex items-center justify-center">
            {avatarFallback}
          </AvatarFallback>
          <AvatarImage
            className="rounded-full"
            src={avatarImage}
            alt={name || email || "User"}
          />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-60"
        side="bottom"
        sideOffset={10}
      >
        <div className="flex flex-col items-center justify-center gap-2 px-2.5 py-4">
          <Avatar className="size-[52px]  border border-neutral-300">
            <AvatarFallback className="bg-neutral-200 text-xl font-medium text-neutral-500 flex items-center justify-center">
              {avatarFallback}
            </AvatarFallback>
            <AvatarImage
              className="rounded-full"
              src={avatarImage}
              alt={name || email || "User"}
            />
          </Avatar>
          <div className="flex flex-col items-center justify-center">
            <p className="text-sm font-medium text-neutral-900">
              {name || "User"}
            </p>
            <p className="text-xs font-medium text-neutral-500">{email}</p>
          </div>
        </div>

        <DottedSeparator className="mb-1" />
        <DropdownMenuItem
          onClick={() => logout()}
          className="h-10 flex items-center justify-center gap-2 text-amber-700 font-medium cursor-pointer"
        >
          <LogOut className="size-4 mr-2" /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
