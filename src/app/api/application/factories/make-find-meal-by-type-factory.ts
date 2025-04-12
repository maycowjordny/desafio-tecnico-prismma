import { PrismaMealRepository } from "../../infra/database/prisma/repositories/prisma-meal-repository";
import { FindMealByTypeUseCase } from "../use-cases/meal/find-meal-by-type-use-case";

export function makeFindMealByType() {
  const mealRepository = new PrismaMealRepository();
  const findMealByTypeUseCase = new FindMealByTypeUseCase(mealRepository);

  return findMealByTypeUseCase;
}
