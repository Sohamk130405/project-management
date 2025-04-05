import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ProjectAvatarProps {
  image?: string;
  name: string;
  className?: string;
  fallbackClassName?: string;
}
const ProjectAvatar = ({
  name,
  className,
  image,
  fallbackClassName,
}: ProjectAvatarProps) => {
  if (image)
    return (
      <div
        className={cn("size-5 relative rounded-md overflow-hidden", className)}
      >
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
    );

  return (
    <Avatar className={cn("size-5 rounded-md", className)}>
      <AvatarFallback
        className={cn("bg-blue-600 rounded-md", fallbackClassName)}
      >
        <span className="text-white text-sm font-semibold text-uppercase">
          {name[0]}
        </span>
      </AvatarFallback>
    </Avatar>
  );
};

export default ProjectAvatar;
