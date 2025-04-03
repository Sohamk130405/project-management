import { cn } from "@/lib/utils";

interface DottedSeparatorProps {
  className?: string;
  color?: string;
  height?: string;
  dotSize?: string;
  gapSize?: string;
  direction?: "horizontal" | "vertical";
}

const DottedSeparator = ({
  className,
  color = "#d4d4d8",
  direction = "horizontal",
  dotSize = "2px",
  gapSize = "6px",
  height = "2px",
}: DottedSeparatorProps) => {
  const isHorizontal = direction === "horizontal";

  const dotSizeValue = parseInt(dotSize);
  const gapSizeValue = parseInt(gapSize);

  return (
    <div
      className={cn(
        isHorizontal
          ? "w-full flex items-center"
          : "h-full flex flex-col items-center",
        className
      )}
    >
      <div
        style={{
          width: isHorizontal ? "100%" : height,
          height: isHorizontal ? height : "100%",
          backgroundImage: `radial-gradient(circle, ${color} 25% , transparent 25%)`,
          backgroundSize: isHorizontal
            ? `${dotSizeValue + gapSizeValue}px ${height}`
            : `${height} ${dotSizeValue + gapSizeValue}px`,
          backgroundRepeat: isHorizontal ? "repeat-x" : "repeat-y",
          backgroundPosition: "center",
        }}
        className={isHorizontal ? "flex-grow" : "flex-grow-0"}
      />
    </div>
  );
};

export default DottedSeparator;
