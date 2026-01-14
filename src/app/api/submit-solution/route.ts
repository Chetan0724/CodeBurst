import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Language } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { taskId, language, output, expectedOutput } = await req.json();

    const normalizeOutput = (str: string) => {
      return str
        .toLowerCase()
        .replace(/[\[\]]/g, "")
        .replace(/\s+/g, "")
        .trim();
    };

    const isCorrect =
      normalizeOutput(output) === normalizeOutput(expectedOutput);

    if (isCorrect) {
      const task = await prisma.task.findFirst({
        where: {
          taskId: parseInt(taskId),
          language: language as Language,
        },
      });

      if (!task) {
        return NextResponse.json({ error: "Task not found" }, { status: 404 });
      }

      await prisma.solvedTask.upsert({
        where: {
          userId_taskId_language: {
            userId: session.user.id,
            taskId: task.id,
            language: language as Language,
          },
        },
        create: {
          userId: session.user.id,
          taskId: task.id,
          language: language as Language,
        },
        update: {},
      });
    }

    return NextResponse.json({
      isCorrect,
      message: isCorrect
        ? "Congratulations! Task solved successfully!"
        : "Output doesn't match expected result. Try again!",
    });
  } catch (error) {
    console.error("Error submitting solution:", error);
    return NextResponse.json(
      { error: "Failed to submit solution" },
      { status: 500 }
    );
  }
}
