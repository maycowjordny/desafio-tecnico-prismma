import { z } from "zod";

export const estimateSchema = z.object({
  mealDescription: z.string().min(1, "Descrição da refeição é obrigatória"),
});
