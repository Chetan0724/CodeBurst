import React from "react";

const Card = () => {
  const Content = [
    {
      heading: "Interactive Coding",
      line: "Practice with real-time code execution in multiple programming languages",
    },
    {
      heading: "Skill Tracking",
      line: "Monitor your progress with XP points, levels, and achievement badges",
    },
    {
      heading: "Community Learning",
      line: "Join a community of developers sharing knowledge and experiences",
    },
    {
      heading: "Instant Feedback",
      line: "Get immediate results and explanations for your code solutions",
    },
    {
      heading: "Structured Learning",
      line: "Follow curated learning paths from beginner to advanced levels",
    },
    {
      heading: "Goal-Oriented",
      line: "Set and achieve specific coding goals with personalized challenges",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-10">
      {Content.map(({ heading, line }) => (
        <div key={line} className="bg-primarytwo border p-4 hover:bg-primaryone hover:border hover:border-white rounded-2xl">
          <h4 className="text-2xl font-bold">{heading}</h4>
          <p className="text-lg text-gray-400">{line}</p>
        </div>
      ))}
    </div>
  );
};

export default Card;
