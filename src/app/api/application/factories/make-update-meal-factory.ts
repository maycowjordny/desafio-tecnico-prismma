import { PrismaMealRepository } from "../../infra/database/prisma/repositories/prisma-meal-repository";
import { UpdateMealUseCase } from "../use-cases/meal/update-meal-use-case";

export function makeUpdateMeal() {
  const mealRepository = new PrismaMealRepository();
  const updateMealUseCase = new UpdateMealUseCase(mealRepository);

  return updateMealUseCase;
}
