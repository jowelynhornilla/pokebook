import { FC } from "react";
import { LoaderProps } from "./Loader.types.";

export const Loader: FC<LoaderProps> = ({ className, dataElementName }) => {
  return (
    <div
      className={`w-full h-full flex flex-col gap-5 items-center justify-center ${className}`}
      data-testid={dataElementName}
    >
      <img className="animate-spin w-20" src="/pokeball.svg" alt="Loading" />
    </div>
  );
};
