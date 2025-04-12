import { PrismaMealRepository } from "../../infra/database/prisma/repositories/prisma-meal-repository";
import { ListMealsUseCase } from "../use-cases/meal/list-meals-use-case";

export function makeListMeals() {
  const mealRepository = new PrismaMealRepository();
  const listMealUseCase = new ListMealsUseCase(mealRepository);

  return listMealUseCase;
}
