import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const GET = async () => {
  try {
    const tasks = await prisma.task.findMany();
    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json(
      { error: "Error fetching tasks" },
      { status: 500 }
    );
  }
};
