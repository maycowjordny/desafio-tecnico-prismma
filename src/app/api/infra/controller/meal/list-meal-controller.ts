import { makeListMeals } from "@/app/api/application/factories/make-list-meal-factory";
import { ListMealsException } from "@/app/api/application/use-cases/meal/errors/list-meals-exception";
import { responseHandler } from "@/utils/response-handler";
import { NextRequest } from "next/server";
import { mealPresenter } from "../../presenters/meal-presenter";

export class MealListController {
  async list(_: NextRequest) {
    try {
      const listMealsUseCase = makeListMeals();

      const meals = await listMealsUseCase.execute();

      const formattedMeals = meals.map(mealPresenter);

      return responseHandler.success({ meals: formattedMeals });
    } catch (err) {
      if (err instanceof ListMealsException) {
        return responseHandler.badRequest(
          "Erro ao listar refeições.",
          err.message
        );
      }

      return responseHandler.internalError("Erro interno no servidor.");
    }
  }
}
