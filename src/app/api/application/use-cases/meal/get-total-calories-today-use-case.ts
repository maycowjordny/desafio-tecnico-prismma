import { MealRepository } from "@/app/api/infra/database/repositories/meal-repository";
import { GetTotalCaloriesTodaException } from "./errors/get-total-calories-today-exception";

export class GetTotalCaloriesTodayUseCase {
  constructor(private readonly mealRepository: MealRepository) {}

  async execute(userId: string): Promise<number> {
    try {
      const meals = await this.mealRepository.findMealsOfToday(userId);

      const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);

      return totalCalories;
    } catch (err) {
      throw new GetTotalCaloriesTodaException((err as Error).message);
    }
  }
}
