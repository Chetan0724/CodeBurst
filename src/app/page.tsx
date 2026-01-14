"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className={`min-h-screen bg-primarytwo text-foreground`}>
      {/* Hero Section */}
      <section className="px-6 sm:px-12 pt-20 pb-28">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight">
              Stop Reading, <br />
              <span className="text-primary">Start Coding</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-md">
              Fast revision platform designed for developers. Practice coding
              tasks, run code instantly using Judge0, and track your progress —
              all with zero theory and 100% practical learning.
            </p>

            <div className="flex gap-4 pt-4">
              <Link
                href="/signup"
                className="bg-black text-white dark:bg-white dark:text-black px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition"
              >
                Start Coding →
              </Link>
              <Link
                href="/tasks"
                className="px-6 py-3 border rounded-xl font-semibold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
              >
                Explore Tasks
              </Link>
            </div>
          </motion.div>

          {/* Right Illustration */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex justify-center"
          >
            <Image
              src="/hero_code.svg"
              alt="Coding illustration"
              width={500}
              height={500}
              className="drop-shadow-xl"
            />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 sm:px-12 border-t">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-14">
            Everything You Need for Fast Revision
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <div className="bg-primarytwo rounded-2xl p-6 shadow hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-2">
                ⚡ Instant Code Execution
              </h3>
              <p className="text-muted-foreground">
                Run code in real-time using Judge0 API without leaving the
                editor.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-primarytwo rounded-2xl p-6 shadow hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-2">
                🧠 Practical Task-Based Learning
              </h3>
              <p className="text-muted-foreground">
                No long theory. Only tasks, challenges, and coding practice.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-primarytwo rounded-2xl p-6 shadow hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-2">💻 Monaco Code Editor</h3>
              <p className="text-muted-foreground">
                Developer-grade editor with autocompletion and syntax
                highlighting.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-primarytwo rounded-2xl p-6 shadow hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-2">📊 Admin Dashboard</h3>
              <p className="text-muted-foreground">
                Track users, manage tasks, and add new challenges easily.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-primarytwo rounded-2xl p-6 shadow hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-2">
                🎯 Multi-Language Practice
              </h3>
              <p className="text-muted-foreground">
                Choose your programming language and start solving.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-primarytwo rounded-2xl p-6 shadow hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-2">
                🧩 Daily Revision Tasks
              </h3>
              <p className="text-muted-foreground">
                Small, bite-sized tasks for consistent practice.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
