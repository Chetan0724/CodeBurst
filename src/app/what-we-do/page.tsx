import Card from "@/components/whatwedo/Card";

const WhatWeDo = () => {
  return (
    <main className="mt-36 text-center h-screen flex flex-col items-center">
      <h2 className="text-6xl font-bold">What We Do</h2>
      <p className="text-2xl text-gray-400 my-10 mx-auto">
        We help developers master their coding skills through interactive
        challenges, real-time practice, and comprehensive learning paths.
      </p>
      <Card />
    </main>
  );
};

export default WhatWeDo;
