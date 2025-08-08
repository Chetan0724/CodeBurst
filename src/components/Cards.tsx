import { HoverEffect } from "@/components/ui/card-hover-effect";

export function CardHoverEffect() {
  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={whyChooseCodeBurst} />
    </div>
  );
}

export const whyChooseCodeBurst = [
  {
    title: "Practice with Real Code",
    description:
      "CodeBurst goes beyond theory by offering interactive, hands-on tasks that help you truly master programming concepts.",
    link: "#real-code-practice", // Replace with internal route or ID
  },
  {
    title: "Language Flexibility",
    description:
      "Start with JavaScript and seamlessly expand to Python, C++, and more — all within the same intuitive interface.",
    link: "#language-support",
  },
  {
    title: "Built for Speed",
    description:
      "With an ultra-fast Monaco editor and Judge0 integration, your code runs in real-time — no setup needed.",
    link: "#performance",
  },
  {
    title: "Track Your Progress",
    description:
      "Monitor your accuracy, task history, time spent, and improvement over time with visual analytics.",
    link: "#analytics",
  },
  {
    title: "Challenge Yourself or Others",
    description:
      "Take on daily tasks or create challenges for friends to compete and learn together.",
    link: "#challenges",
  },
  {
    title: "Lightweight, Yet Powerful",
    description:
      "CodeBurst uses a clean, responsive design with full dark mode support — perfect for learning anywhere, anytime.",
    link: "#design",
  },
];

// export const projects = [
//   {
//     title: "Stripe",
//     description:
//       "A technology company that builds economic infrastructure for the internet.",
//     link: "https://stripe.com",
//   },
//   {
//     title: "Netflix",
//     description:
//       "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
//     link: "https://netflix.com",
//   },
//   {
//     title: "Google",
//     description:
//       "A multinational technology company that specializes in Internet-related services and products.",
//     link: "https://google.com",
//   },
//   {
//     title: "Meta",
//     description:
//       "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
//     link: "https://meta.com",
//   },
//   {
//     title: "Amazon",
//     description:
//       "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
//     link: "https://amazon.com",
//   },
//   {
//     title: "Microsoft",
//     description:
//       "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
//     link: "https://microsoft.com",
//   },
// ];
