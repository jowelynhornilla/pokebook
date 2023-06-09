import { ReactNode } from "react";
import { Header } from "./Header";

export const Layout = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="grow flex-1 min-h-[0]">{children}</main>
    </div>
  );
};
