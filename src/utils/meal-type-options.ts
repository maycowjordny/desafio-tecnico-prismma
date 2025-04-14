import { MealTypeEnum } from "@/app/api/domain/enum/meal-type-enum";

export const mealTypeOptions: Record<MealTypeEnum, string> = {
  [MealTypeEnum.BREAKFAST]: "Café da manhã",
  [MealTypeEnum.LUNCH]: "Almoço",
  [MealTypeEnum.AFTERNOON_SNACK]: "Lanche da tarde",
  [MealTypeEnum.DINNER]: "Janta",
};
