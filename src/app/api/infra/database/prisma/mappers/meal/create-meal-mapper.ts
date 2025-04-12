import { Meal } from "@/app/api/domain/entities/meal-entity";
import { MealTypeEnum } from "@/app/api/domain/enum/meal-type-enum";
import { MealType, Prisma } from "@/generated/prisma";
import { MealMapper } from "./meal-mapper";

export class CreateMealMapper extends MealMapper {
  static convertToPrisma(meal: Meal): Prisma.MealCreateInput {
    return {
      name: meal.name,
      description: meal.description!,
      calories: meal.calories,
      feedingAt: meal.feedingAt,
      type: MealTypeEnum[meal.type] as MealType,
    };
  }
}
