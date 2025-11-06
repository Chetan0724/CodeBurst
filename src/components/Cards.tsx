import { HoverEffect } from "@/components/ui/card-hover-effect";

export function CardHoverEffect() {
  return (
    <>
      <h2 className="text-4xl font-bold text-center mt-14">
        Why Choose CodeBurst?
      </h2>
      <div className="max-w-5xl mx-auto px-8">
        <HoverEffect items={whyChooseCodeBurst} />
      </div>
    </>
  );
}

export const whyChooseCodeBurst = [
  {
    title: "Practice with Real Code",
    description:
      "CodeBurst goes beyond theory by offering interactive, hands-on tasks that help you truly master programming concepts.",
  },
  {
    title: "Language Flexibility",
    description:
      "Start with JavaScript and seamlessly expand to Python, C++, and more — all within the same intuitive interface.",
  },
  {
    title: "Built for Speed",
    description:
      "With an ultra-fast Monaco editor and Judge0 integration, your code runs in real-time — no setup needed.",
  },
  {
    title: "Track Your Progress",
    description:
      "Monitor your accuracy, task history, time spent, and improvement over time with visual analytics.",
  },
  {
    title: "Challenge Yourself or Others",
    description:
      "Take on daily tasks or create challenges for friends to compete and learn together.",
  },
  {
    title: "Lightweight, Yet Powerful",
    description:
      "CodeBurst uses a clean, responsive design with full dark mode support — perfect for learning anywhere, anytime.",
  },
];
