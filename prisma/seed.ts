import { PrismaClient, Difficulty, Language } from "@prisma/client";
import { tasksArray } from "@/lib/tasksData";

const prisma = new PrismaClient();

async function main() {
  for (const task of tasksArray) {
    await prisma.task.upsert({
      where: {
        taskId_language: {
          taskId: task.taskId,
          language: task.language as Language,
        },
      },
      update: {},
      create: {
        taskId: task.taskId,
        difficulty: task.difficulty as Difficulty,
        expectedOutput: task.expectedOutput,
        description: task.description,
        language: task.language as Language,
        topic: task.topic,
      },
    });
  }
  console.log("All tasks inserted successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
