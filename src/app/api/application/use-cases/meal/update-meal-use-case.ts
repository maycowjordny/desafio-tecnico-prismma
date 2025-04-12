import { Meal } from "@/app/api/domain/entities/meal-entity";
import { MealRepository } from "@/app/api/infra/database/repositories/meal-repository";
import { UpdateMealException } from "./errors/update-meal-exception";

export class UpdateMealUseCase {
  constructor(private readonly mealRepository: MealRepository) {}

  async execute(meal: Meal): Promise<Meal> {
    try {
      return await this.mealRepository.update(meal);
    } catch (err) {
      throw new UpdateMealException((err as Error).message);
    }
  }
}
