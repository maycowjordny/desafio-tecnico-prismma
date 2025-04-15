import { MealTypeEnum } from "@/app/api/domain/enum/meal-type-enum";
import { z } from "zod";

const mealTypeEnumValues = Object.values(MealTypeEnum) as [MealTypeEnum];

export const mealSchema = z
  .object({
    name: z.string().min(1, "Nome é obrigatório"),
    type: z.enum(mealTypeEnumValues),
    description: z.string().min(1, "Descrição é obrigatória"),
    feedingAt: z.date(),
    calories: z.number().min(0),
    imageBase64: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.description && !data.imageBase64) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["description"],
        message: "Descrição ou imagem é obrigatória",
      });
    }
  });

export type MealValidationSchema = z.infer<typeof mealSchema>;
