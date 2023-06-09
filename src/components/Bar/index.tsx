import { FC } from "react";
import { BarProps } from "./Bar.types";

export const Bar: FC<BarProps> = ({ className = "bg-normal", value }) => {
  return (
    <div className={`w-full rounded-full bg-gray-200`}>
      <div
        className={`text-white text-center py-2 leading-none rounded-full ${className}`}
        style={{
            width: `${value}%`
        }}
      >
        {value}
      </div>
    </div>
  );
};