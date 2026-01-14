import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const POST = async (req: NextRequest) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const taskData = await req.json();

    const existingTask = await prisma.task.findUnique({
      where: {
        taskId_language: {
          taskId: taskData.taskId,
          language: taskData.language,
        },
      },
    });

    if (existingTask) {
      return NextResponse.json(
        { error: "Task already exists for this language" },
        { status: 400 }
      );
    }

    const task = await prisma.task.create({
      data: {
        taskId: taskData.taskId,
        topic: taskData.topic,
        description: taskData.description,
        language: taskData.language,
        difficulty: taskData.difficulty,
        expectedOutput: taskData.expectedAnswer,
      },
    });

    return NextResponse.json({ task }, { status: 201 });
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
};
