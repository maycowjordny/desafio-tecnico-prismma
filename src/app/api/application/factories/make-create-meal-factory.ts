import { PrismaMealRepository } from "../../infra/database/prisma/repositories/prisma-meal-repository";
import { CreateMealUseCase } from "../use-cases/meal/create-meal-use-case";

export function makeCreateMeal() {
  const mealRepository = new PrismaMealRepository();
  const createMealUseCase = new CreateMealUseCase(mealRepository);

  return createMealUseCase;
}
