import { cn } from "@/lib/utils";

const Loader = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "w-4 h-4 border-2 border-gray-200 border-t-transparent rounded-full animate-spin",
        className
      )}
    />
  );
};

export default Loader;