import { ReactNode } from "react";
import { Header } from "./Header";

export const Layout = ({ children }: { children?: ReactNode }) => {
  return (
    <>
      <Header />
      <main className="p-4 mt-2">{children}</main>
    </>
  );
};
