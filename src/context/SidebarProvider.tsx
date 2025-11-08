"use client";
import SidebarContext from "./SidebarContext";
import { ReactNode, useState } from "react";

const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarProvider;
