import { FC } from "react";
import { BarProps } from "./Bar.types";

export const Bar: FC<BarProps> = ({
  className = "bg-normal",
  value,
  dataElementName,
}) => {
  return (
    <div
      className={`w-full rounded-full bg-gray-200 hover:scale-105 transition ease-in-out`}
      data-testid={dataElementName}
    >
      <div
        className={`text-white text-center py-2 leading-none rounded-full ${className}`}
        style={{
          width: `${Math.min(100, value)}%`,
        }}
      >
        {value}
      </div>
    </div>
  );
};
