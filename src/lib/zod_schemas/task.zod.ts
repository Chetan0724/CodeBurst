import * as z from "zod";

export const TaskFormSchema = z.object({
  topic: z.string().min(3).trim(),
  taskId: z.string().regex(/^\d+$/),
  language: z.enum(["javascript", "python", "cpp", "java", "go", "rust"]),
  difficulty: z.enum(["Easy", "Medium", "Hard"]),
  description: z.string().min(10).trim(),
  expectedAnswer: z.string().min(1).trim(),
});

export type TTaskFormInput = z.infer<typeof TaskFormSchema>;
