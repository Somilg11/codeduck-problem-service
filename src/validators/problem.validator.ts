import {z} from "zod";

export const createProblemSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  difficulty: z.enum(["easy", "medium", "hard"], {
    message: "Difficulty must be one of: easy, medium, hard",
  }),
  editorial: z.string().optional(),
  testcases: z.array(z.object({
    input: z.string().min(1, "Test case input is required"),
    output: z.string().min(1, "Test case output is required"),
  })).optional(),
});

export const updateProblemSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  description: z.string().min(1, "Description is required").optional(),
  difficulty: z.enum(["easy", "medium", "hard"], {
    message: "Difficulty must be one of: easy, medium, hard",
  }).optional(),
  editorial: z.string().optional(),
  testcases: z.array(z.object({
    input: z.string().min(1, "Test case input is required"),
    output: z.string().min(1, "Test case output is required"),
  })).optional(),
});

export const findByDifficultySchema = z.object({
  difficulty: z.enum(["easy", "medium", "hard"], {
    message: "Difficulty must be one of: easy, medium, hard",
  }),
});

export type ICreateProblemDto = z.infer<typeof createProblemSchema>;
export type IUpdateProblemDto = z.infer<typeof updateProblemSchema>;