import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface MemberAvatarProps {
  name: string;
  className?: string;
  fallbackClassName?: string;
}
const MemberAvatar = ({
  name,
  className,
  fallbackClassName,
}: MemberAvatarProps) => {
  return (
    <Avatar
      className={cn(
        "size-10 rounded-full transition border-neutral-300",
        className
      )}
    >
      <AvatarFallback
        className={cn(
          "bg-neutral-200 font-medium text-neutral-500 items-center justify-center",
          fallbackClassName
        )}
      >
        {name[0].toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};

export default MemberAvatar;
