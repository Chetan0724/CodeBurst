import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Language } from "@prisma/client";

export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const languageParam = searchParams.get("language");
    
    // Validate that the language is a valid Language enum value
    const isValidLanguage = (lang: string | null): lang is Language => {
      return lang !== null && Object.values(Language).includes(lang as Language);
    };

    const whereClause = languageParam && isValidLanguage(languageParam)
      ? { userId: session.user.id, language: languageParam }
      : { userId: session.user.id };

    const solvedTasks = await prisma.solvedTask.findMany({
      where: whereClause,
      include: {
        task: true,
      },
    });

    const tasksByLanguage = await prisma.task.groupBy({
      by: ["language"],
      _count: true,
    });

    const solvedByLanguage = await prisma.solvedTask.groupBy({
      by: ["language"],
      where: { userId: session.user.id },
      _count: true,
    });

    const languageStats = tasksByLanguage.map((lang) => ({
      language: lang.language,
      total: lang._count,
      solved:
        solvedByLanguage.find((s) => s.language === lang.language)?._count || 0,
    }));

    return NextResponse.json({
      solvedTasks: solvedTasks.map((st) => ({
        taskId: st.task.taskId,
        language: st.language,
        solvedAt: st.solvedAt,
      })),
      languageStats,
      totalSolved: solvedTasks.length,
    });
  } catch (error) {
    console.error("Error fetching progress:", error);
    return NextResponse.json(
      { error: "Failed to fetch progress" },
      { status: 500 }
    );
  }
}
