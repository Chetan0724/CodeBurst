import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Language } from "@prisma/client";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ language: string }> }
) {
  try {
    const { language } = await params;
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    if (!Object.values(Language).includes(language as Language)) {
      return NextResponse.json({ error: "Invalid language" }, { status: 400 });
    }

    const [tasks, total] = await Promise.all([
      prisma.task.findMany({
        where: { language: language as Language },
        orderBy: { taskId: "asc" },
        skip,
        take: limit,
      }),
      prisma.task.count({
        where: { language: language as Language },
      }),
    ]);

    return NextResponse.json({
      tasks,
      pagination: {
        page,
        limit,
        total,
        hasMore: skip + tasks.length < total,
      },
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}
