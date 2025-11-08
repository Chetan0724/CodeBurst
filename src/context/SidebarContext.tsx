"use client";
import { createContext, Dispatch, SetStateAction } from "react";

interface SidebarContextType {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

const SidebarContext = createContext<SidebarContextType | null>(null);

export default SidebarContext;
