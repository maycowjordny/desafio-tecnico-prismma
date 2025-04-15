import { MealTypeEnum } from "@/app/api/domain/enum/meal-type-enum";

export interface Meal {
  id: string;
  name: string;
  type: MealTypeEnum;
  description: string;
  imageBase64?: string;
  feedingAt: Date;
  calories: number;
}
