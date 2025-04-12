import { MealTypeEnum } from "@/app/api/domain/enum/meal-type-enum";
import { z } from "zod";

export const mealTypeSchema = z.object({
  type: z.nativeEnum(MealTypeEnum),
});
