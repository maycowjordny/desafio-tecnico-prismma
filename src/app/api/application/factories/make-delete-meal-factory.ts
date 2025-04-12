import { PrismaMealRepository } from "../../infra/database/prisma/repositories/prisma-meal-repository";
import { DeleteMealUseCase } from "../use-cases/meal/delete-meal-use-case";

export function makeDeleteMeal() {
  const mealRepository = new PrismaMealRepository();
  const deleteMealUseCase = new DeleteMealUseCase(mealRepository);

  return deleteMealUseCase;
}
