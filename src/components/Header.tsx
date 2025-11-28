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
import { usePathname } from "next/navigation";
import ProfileDropdown from "./ProfileDropdown";
import { IconArrowLeft } from "@tabler/icons-react";
import { Button } from "./ui/button";

export function Header() {
  const { isSidebarOpen, setIsSidebarOpen } = useContext(SidebarContext)!;
  const auth = true;
  const pathname = usePathname();

  if (pathname === "/signin" || pathname === "/signup") {
    return (
      <header className="flex justify-between px-4 pt-2 items-center">
        <Button variant="ghost" asChild>
          <Link href="/">
            <IconArrowLeft stroke={2} />
          </Link>
        </Button>
        <ModeToggle />
      </header>
    );
  }

  return (
    <header className="flex justify-between px-4 py-2 border-b bg-primarytwo sticky top-0 z-50 h-13">
      <div className="flex items-center gap-4">
        {pathname === "/dashboard" && (
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="cursor-pointer hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black rounded-full"
          >
            {isSidebarOpen ? (
              <IconLayoutSidebarLeftCollapse stroke={2} className="p-0.5" />
            ) : (
              <IconLayoutSidebarLeftExpand stroke={2} className="p-0.5" />
            )}
          </button>
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
      <div className="flex items-center gap-1">
        {auth ? (
          <ProfileDropdown />
        ) : (
          <div className="space-x-4">
            <Link href="/signin">Login</Link>
            <Link
              href="/signup"
              className="bg-black text-white dark:bg-white dark:text-black px-1.5"
            >
              Signup
            </Link>
          </div>
        )}
        <ModeToggle />
      </div>
    </header>
  );
}
