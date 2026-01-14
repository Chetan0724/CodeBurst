"use client";
import { ModeToggle } from "./ThemeToggle";
import Image from "next/image";
import Link from "next/link";
import { IconChevronRight, IconChevronLeft } from "@tabler/icons-react";
import { useContext } from "react";
import SidebarContext from "@/context/SidebarContext";
import { usePathname } from "next/navigation";
import ProfileDropdown from "./ProfileDropdown";
import { authClient } from "@/lib/auth-client";
import { IconArrowLeft } from "@tabler/icons-react";
import { Button } from "./ui/button";

export function Header() {
  const { isSidebarOpen, setIsSidebarOpen } = useContext(SidebarContext)!;
  const { data: session, isPending } = authClient.useSession();
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
    <header className="max-w-7xl mx-auto border-b bg-primarytwo w-full flex justify-between px-4 py-10 sm:px-8 sticky top-0 z-20 h-13">
      <div className="flex items-center gap-4">
        {pathname === "/dashboard" && (
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="cursor-pointer bg-black text-white dark:bg-white dark:text-black rounded-full h-5 w-5 flex items-center justify-center"
          >
            {isSidebarOpen ? <IconChevronLeft /> : <IconChevronRight />}
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
      <div className="flex items-center gap-2">
        {isPending ? null : session ? (
          <ProfileDropdown />
        ) : (
          <div className="space-x-4">
            <Link
              href="/signin"
              className="font-medium text-primary hover:underline"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="bg-primary text-white px-3 py-1 rounded-md font-medium hover:bg-primary/90 transition-colors"
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
