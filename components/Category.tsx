import Image from "next/image";

import { cn } from "@/lib/utils";

import { Progress } from "./ui/progress";

export const Category = ({icon,name,count,bgcolor,progressbar}) => {

  return (
    <div className={`gap-[18px] flex p-4 rounded-xl ${bgcolor}`}>
      <figure className={cn("flex-center size-10 rounded-full")}>
        <Image src={icon} width={20} height={20} alt={name} />
      </figure>
      <div className="flex w-full flex-1 flex-col gap-2">
        <div className="text-14 flex justify-between">
          <h2 className={cn("font-medium")}>{name}</h2>
          <h3 className={cn("font-normal")}>{count}&#36; left</h3>
        </div>
        <Progress
          value={count}
          className={`h-2 w-[${(count-10)}%] ${progressbar}`}
        />
      </div>
    </div>
  );
};
