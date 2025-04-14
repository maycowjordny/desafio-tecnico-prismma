import { Meal } from "@/app/api/domain/entities/meal-entity";
import { MealRepository } from "@/app/api/infra/database/repositories/meal-repository";
import { FindMealByTypeException } from "./errors/find-meal-by-type-exception";

export class FindMealByTypeUseCase {
  constructor(private readonly mealRepository: MealRepository) {}

  async execute(type: string): Promise<Meal[]> {
    try {
      return await this.mealRepository.findByType(type);
    } catch (err) {
      throw new FindMealByTypeException((err as Error).message);
    }
  }
}
