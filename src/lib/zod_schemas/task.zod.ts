import * as z from "zod";

export const TaskFormSchema = z.object({
  topic: z
    .string()
    .min(3, "Please choose a topic of at least 3 characters")
    .trim(),
  taskId: z.coerce
    .number("Please enter a numeric Task ID (e.g., 16, 17, etc.)")
    .min(1, "Please enter a valid Task ID"),
  language: z.enum(["javascript", "python", "cpp", "java", "go", "rust"], {
    message: "Please select a programming language",
  }),
  difficulty: z.enum(["Easy", "Medium", "Hard"], {
    message: "Please select a difficulty level",
  }),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters.")
    .trim(),
  expectedAnswer: z
    .string()
    .min(1, "Please choose a valid expectedAnswer")
    .trim(),
});

export type TTaskFormSchema = z.infer<typeof TaskFormSchema>;
