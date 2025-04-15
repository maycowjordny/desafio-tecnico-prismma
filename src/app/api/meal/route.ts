import { ensureAuthenticated } from "@/utils/get-session-user-id";
import { responseHandler } from "@/utils/response-handler";
import { NextRequest } from "next/server";
import { makeListMeals } from "../application/factories/make-list-meal-factory";
import { ListMealsException } from "../application/use-cases/meal/errors/list-meals-exception";
import { mealPresenter } from "../infra/presenters/meal-presenter";

export async function GET(request: NextRequest) {
  try {
    const userId = await ensureAuthenticated();

    const listMealsUseCase = makeListMeals();

    const meals = await listMealsUseCase.execute(userId);

    const formattedMeals = meals.map(mealPresenter);

    return responseHandler.success({ meals: formattedMeals });
  } catch (err) {
    if (err instanceof ListMealsException) {
      return responseHandler.badRequest(
        "Erro ao listar refeições.",
        err.message
      );
    }

    return responseHandler.internalError(
      `Erro interno do servidor ao listar refeições: ${err}`
    );
  }
}
