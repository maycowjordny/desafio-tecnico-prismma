import { Meal } from "@/app/api/domain/entities/meal-entity";
import { MealTypeEnum } from "@/app/api/domain/enum/meal-type-enum";
import { Meal as RawMeal } from "@/generated/prisma";

export class MealMapper {
  static toDomain(raw: RawMeal): Meal {
    return new Meal({
      id: raw.id,
      calories: raw.calories,
      name: raw.name,
      type: raw.type as MealTypeEnum,
      feedingAt: raw.feedingAt,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }
}
