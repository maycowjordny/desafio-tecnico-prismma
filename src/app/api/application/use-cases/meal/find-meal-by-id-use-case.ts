import { Meal } from "@/app/api/domain/entities/meal-entity";
import { MealRepository } from "@/app/api/infra/database/repositories/meal-repository";
import { FindMealByIdException } from "./errors/find-meal-by-id-exception";

export class FindMealByIdUseCase {
  constructor(private readonly mealRepository: MealRepository) {}

  async execute(mealId: string, userId: string): Promise<Meal | null> {
    try {
      return await this.mealRepository.findById(mealId, userId);
    } catch (err) {
      throw new FindMealByIdException((err as Error).message);
    }
  }
}
