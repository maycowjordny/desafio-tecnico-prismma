import { PrismaMealRepository } from "../../infra/database/prisma/repositories/prisma-meal-repository";
import { FindMealByIdUseCase } from "../use-cases/meal/find-meal-by-id-use-case";

export function makeFindMealById() {
  const mealRepository = new PrismaMealRepository();
  const findMealByIdUseCase = new FindMealByIdUseCase(mealRepository);

  return findMealByIdUseCase;
}
