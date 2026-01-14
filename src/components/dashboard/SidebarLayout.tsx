"use client";
import { ReactNode } from "react";
import LeftBar from "./LeftBar";

export default function SidebarLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full">
      <LeftBar />
      <div className="flex-grow">{children}</div>
    </div>
  );
}
