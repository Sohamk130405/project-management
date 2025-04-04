import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface WorkspaceAvatarProps {
  image?: string;
  name: string;
  className?: string;
}
const WorkspaceAvatar = ({ name, className, image }: WorkspaceAvatarProps) => {
  if (image)
    return (
      <div
        className={cn("size-10 relative rounded-md overflow-hidden", className)}
      >
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
    );

  return (
    <Avatar className={cn("size-10 rounded-md", className)}>
      <AvatarFallback className="bg-blue-600 rounded-md">
        <span className="text-white  font-semibold text-uppercase">
          {name[0]}
        </span>
      </AvatarFallback>
    </Avatar>
  );
};

export default WorkspaceAvatar;
