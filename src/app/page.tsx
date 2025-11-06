"use client";
import { CardHoverEffect } from "@/components/Cards";
import { FAQComp } from "@/components/FAQ";
import { HeroHighlightComp } from "@/components/Hero";

export default function Home() {
  return (
    <>
      <HeroHighlightComp />
      <CardHoverEffect />
      <FAQComp />
    </>
  );
}
