"use client";
import { ModeToggle } from "./ThemeToggle";
import Image from "next/image";
import Link from "next/link";
import {
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarLeftExpand,
} from "@tabler/icons-react";
import { useContext } from "react";
import SidebarContext from "@/context/SidebarContext";

export function Header() {
  const { isSidebarOpen, setIsSidebarOpen } = useContext(SidebarContext)!;

  return (
    <header className="flex justify-between px-4 py-2 border-b bg-primarytwo sticky top-0 z-50">
      <div
        className="flex items-center gap-4"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? (
          <IconLayoutSidebarLeftCollapse
            stroke={2}
            className="bg-primarytwo border-2 p-0.5 rounded-full"
          />
        ) : (
          <IconLayoutSidebarLeftExpand
            stroke={2}
            className="bg-primarytwo border-2 p-0.5 rounded-full"
          />
        )}

        <Link href="/">
          <Image
            src="/logo_dark.svg"
            alt="logo"
            className="block dark:hidden"
            width={120}
            height={120}
          />
          <Image
            src="/logo_light.svg"
            alt="logo"
            className="hidden dark:block"
            width={120}
            height={120}
          />
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/signin">Login</Link>
        <Link
          href="/signup"
          className="bg-black text-white dark:bg-white dark:text-black px-1.5"
        >
          Signup
        </Link>
        <ModeToggle />
      </div>
    </header>
  );
}
