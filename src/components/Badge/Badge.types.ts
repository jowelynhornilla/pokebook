import { ReactNode } from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
    dataElementName?: string;
}