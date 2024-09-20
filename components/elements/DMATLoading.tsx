import { cn } from "@/lib/utils";

const DMATLoading = ({ otherClass }: { otherClass?: string }) => {
  return (
    <div
      className={cn(
        `animate-spin h-10 w-10 border-4 border-[#FFD700] rounded-full border-t-transparent`,
        otherClass
      )}
    ></div>
  );
};

export default DMATLoading;
