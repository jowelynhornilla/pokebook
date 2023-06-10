import { FC } from "react";
import { BadgeProps } from "./Badge.types";
import cn from "classnames";

export const Badge: FC<BadgeProps> = ({ className, children, dataElementName, ...props }) => {
  return (
    <div {...props} className={cn("px-3 py-1 rounded-2xl", className)} data-testid={dataElementName}>
      {children}
    </div>
  );
};
