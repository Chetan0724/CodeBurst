import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Language, Difficulty } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await req.json();
    const { id, topic, description, expectedOutput, difficulty, language } =
      body;

    if (
      !id ||
      !topic ||
      !description ||
      !expectedOutput ||
      !difficulty ||
      !language
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const task = await prisma.task.update({
      where: { id },
      data: {
        topic,
        description,
        expectedOutput,
        difficulty: difficulty as Difficulty,
        language: language as Language,
      },
    });

    return NextResponse.json({ task }, { status: 200 });
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json(
      { error: "Error updating task" },
      { status: 500 }
    );
  }
}

