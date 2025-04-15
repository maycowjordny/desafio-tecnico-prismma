import { Meal } from "@/app/api/domain/entities/meal-entity";
import { MealTypeEnum } from "@/app/api/domain/enum/meal-type-enum";
import { MealRepository } from "@/app/api/infra/database/repositories/meal-repository";
import { generateNewDate } from "@/utils/generate-new-date";
import { randomUUID } from "crypto";

export class MealInMemory implements MealRepository {
  public MEALS: Meal[] = [];

  async create(data: Meal): Promise<Meal> {
    const meals = Meal.create({
      id: randomUUID(),
      calories: data.calories,
      feedingAt: data.feedingAt,
      name: data.name,
      description: data.description,
      updatedAt: generateNewDate(data.updatedAt),
      createdAt: generateNewDate(data.createdAt),
      type: MealTypeEnum.BREAKFAST,
      userId: data.userId,
    });

    this.MEALS.push(meals);

    return meals;
  }

  findAll(userId: string): Promise<Meal[]> {
    throw new Error("Method not implemented.");
  }
  findById(mealId: string, userId: string): Promise<Meal | null> {
    throw new Error("Method not implemented.");
  }
  findMealsOfToday(userId: string): Promise<Meal[]> {
    throw new Error("Method not implemented.");
  }
  update(meal: Meal): Promise<Meal> {
    throw new Error("Method not implemented.");
  }
  delete(mealId: string, userId: string): Promise<null> {
    throw new Error("Method not implemented.");
  }
}
