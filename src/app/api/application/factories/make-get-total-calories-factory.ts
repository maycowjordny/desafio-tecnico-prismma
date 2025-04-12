import { PrismaMealRepository } from "../../infra/database/prisma/repositories/prisma-meal-repository";
import { GetTotalCaloriesTodayUseCase } from "../use-cases/meal/get-total-calories-today-use-case";

export function makeGetTotalCaloriesToday() {
  const mealRepository = new PrismaMealRepository();
  const getTotalCaloriesTodayUseCase = new GetTotalCaloriesTodayUseCase(
    mealRepository
  );

  return getTotalCaloriesTodayUseCase;
}
