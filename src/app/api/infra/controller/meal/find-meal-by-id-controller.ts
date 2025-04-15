import { makeFindMealById } from "@/app/api/application/factories/make-find-meal-by-id-factory";
import { FindMealByIdException } from "@/app/api/application/use-cases/meal/errors/find-meal-by-id-exception";
import { ensureAuthenticated } from "@/utils/get-session-user-id";
import { responseHandler } from "@/utils/response-handler";
import { z } from "zod";
import { mealPresenter } from "../../presenters/meal-presenter";

export class FindMealByIdController {
  async listById(mealId: string) {
    try {
      const userId = await ensureAuthenticated();

      if (!mealId) {
        return responseHandler.notFound("Refeição não encontrada.");
      }

      const findMealByIdUseCase = makeFindMealById();

      const meals = await findMealByIdUseCase.execute(mealId, userId);

      if (!meals) {
        return responseHandler.notFound("Refeição não encontrada.");
      }

      const mealFormatted = mealPresenter(meals);
      return responseHandler.success({ meal: mealFormatted });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return responseHandler.badRequest(
          "Tipo de refeição inválido.",
          err.errors
        );
      }

      if (err instanceof FindMealByIdException) {
        return responseHandler.badRequest(
          "Erro de validação nos dados fornecidos para encontrar a refeição.",
          err.message
        );
      }

      return responseHandler.internalError("Erro interno no servidor.");
    }
  }
}
