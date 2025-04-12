import { Meal } from "../../../domain/entities/meal-entity";
import { MealRepository } from "../../../infra/database/repositories/meal-repository";
import { CreateMealException } from "./errors/create-meal-exception";

export class CreateMealUseCase {
  constructor(private readonly mealRepository: MealRepository) {}

  async execute(mealInput: Meal): Promise<Meal> {
    try {
      return await this.mealRepository.create(mealInput);
    } catch (err) {
      throw new CreateMealException((err as Error).message);
    }
  }
}
