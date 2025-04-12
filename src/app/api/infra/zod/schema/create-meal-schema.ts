import { MealTypeEnum } from "@/app/api/domain/enum/meal-type-enum";
import { z } from "zod";

const mealTypeEnumValues = Object.values(MealTypeEnum) as [MealTypeEnum];

export const mealSchema = z.object({
  description: z.string().min(1, "Descrição é obrigatória"),
  name: z.string().min(1, "Nome é obrigatório"),
  type: z.enum(mealTypeEnumValues),
  feedingAt: z.coerce.date({ message: "Data inválida" }),
  calories: z
    .number({
      required_error: "Calorias são obrigatórias",
      invalid_type_error: "Calorias devem ser um número",
    })
    .positive("Calorias devem ser um número positivo"),
});
