import { Meal } from "@/app/api/domain/entities/meal-entity";
import { MealRepository } from "@/app/api/infra/database/repositories/meal-repository";
import { ListMealsException } from "./errors/list-meals-exception";

export class ListMealsUseCase {
  constructor(private readonly mealRepository: MealRepository) {}

  async execute(userId: string): Promise<Meal[]> {
    try {
      return await this.mealRepository.findAll(userId);
    } catch (error) {
      throw new ListMealsException();
    }
  }
}
