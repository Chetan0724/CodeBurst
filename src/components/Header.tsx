"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import { ModeToggle } from "./ThemeToggle";
import ProfileDropdown from "./ProfileDropdown";
import Link from "next/link";

export function NavbarComp({ session }) {
  const navItems = [
    {
      name: "What we do",
      link: "what-we-do",
    },
    {
      name: "Try Demo",
      link: "demo",
    },
    {
      name: "Contact",
      link: "contact",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full">
      {!session ? (
        <Navbar>
          {/* Desktop Navigation */}
          <NavBody>
            <NavbarLogo />
            <NavItems items={navItems} />
            <div className="flex items-center gap-4">
              <NavbarButton href="/signin" variant="secondary">
                Login
              </NavbarButton>
              <NavbarButton href="/signup" variant="primary">
                Signup
              </NavbarButton>
              <ModeToggle />
            </div>
          </NavBody>
          {/* Mobile Navigation */}
          <MobileNav>
            <MobileNavHeader>
              <NavbarLogo />
              <MobileNavToggle
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </MobileNavHeader>

            <MobileNavMenu
              isOpen={isMobileMenuOpen}
              onClose={() => setIsMobileMenuOpen(false)}
            >
              {navItems.map((item, idx) => (
                <Link
                  key={`mobile-link-${idx}`}
                  href={item.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="relative text-neutral-600 dark:text-neutral-300"
                >
                  <span className="block">{item.name}</span>
                </Link>
              ))}
              <div className="flex w-full flex-col gap-4">
                <NavbarButton
                  href="/signin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  variant="primary"
                  className="w-full"
                >
                  Login
                </NavbarButton>
                <NavbarButton
                  href="/signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                  variant="primary"
                  className="w-full"
                >
                  Signup
                </NavbarButton>
              </div>
            </MobileNavMenu>
          </MobileNav>
        </Navbar>
      ) : (
        <Navbar>
          {/* Desktop Navigation */}
          <NavBody>
            <NavbarLogo />
            <div className="flex items-center gap-4">
              <ProfileDropdown />
              <ModeToggle />
            </div>
          </NavBody>
          <MobileNav>
            <MobileNavHeader>
              <NavbarLogo />
              <ProfileDropdown />
            </MobileNavHeader>
          </MobileNav>
        </Navbar>
      )}
    </div>
  );
}
