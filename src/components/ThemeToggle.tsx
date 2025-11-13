"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { IconBrightness } from "@tabler/icons-react";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  const themeHander = () => {
    if (theme == "dark") setTheme("light");
    else setTheme("dark");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative cursor-pointer"
      onClick={themeHander}
    >
      <IconBrightness />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
