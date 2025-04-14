import { MealRepository } from "../../../infra/database/repositories/meal-repository";
import { DeleteMealException } from "./errors/delete-meal-exception";

export class DeleteMealUseCase {
  constructor(private readonly mealRepository: MealRepository) {}

  async execute(id: string): Promise<void> {
    try {
      await this.mealRepository.delete(id);
    } catch (err) {
      throw new DeleteMealException((err as Error).message);
    }
  }
}
