"use client";
import { CardHoverEffect } from "@/components/Cards";
import { FAQComp } from "@/components/FAQ";
import { NavbarComp } from "@/components/Header";
import { HeroHighlightComp } from "@/components/Hero";

export default function Home() {
  return (
    <>
      <NavbarComp />
      <HeroHighlightComp />
      <CardHoverEffect />
      <h2>💡 Frequently Asked Questions (FAQ)</h2>
      <FAQComp />
    </>
  );
}
