import { Meal } from "@/app/api/domain/entities/meal-entity";
import { MealRepository } from "@/app/api/infra/database/repositories/meal-repository";
import { FindMealByIdException } from "./errors/find-meal-by-id-exception";

export class FindMealByIdUseCase {
  constructor(private mealRepository: MealRepository) {}

  async execute(id: string): Promise<Meal | null> {
    try {
      return await this.mealRepository.findById(id);
    } catch (err) {
      throw new FindMealByIdException((err as Error).message);
    }
  }
}
