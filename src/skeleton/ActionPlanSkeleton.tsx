import { Skeleton } from "@/components/ui/skeleton";

const ActionPlanSkeleton = () => {
  return (
    <div className="max-w-[24rem] w-full h-[11rem] bg-black/5 shadow-md rounded-xl border-[1px] md:border-white/20 flex sm:flex-row flex-col pt-5 md:pl-5 md:border-t-0 border-t-[0.8rem] border-white">
      <div className="items-end justify-center sm:flex hidden flex-shrink-0 ">
        <Skeleton className="w-28 h-full " />
      </div>
      <div className="md:pl-3 md:pr-3 px-5">
        <div className="w-full block overflow-hidden">
          <Skeleton className="w-28 h-5 rounded-full" />
        </div>
        <Skeleton className="w-20 h-5 rounded-full mt-2" />
      </div>
    </div>
  );
};

export default ActionPlanSkeleton;
