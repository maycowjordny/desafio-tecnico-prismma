import { makeDeleteMeal } from "@/app/api/application/factories/make-delete-meal-factory";
import { DeleteMealException } from "@/app/api/application/use-cases/meal/errors/delete-meal-exception";
import { responseHandler } from "@/utils/response-handler";

export class MealDeleteController {
  async delete(mealId: string) {
    try {
      if (!mealId) {
        return responseHandler.notFound("Refeição não encontrada.");
      }

      const deleteMealUseCase = makeDeleteMeal();

      await deleteMealUseCase.execute(mealId);

      return responseHandler.success("Refeição excluída com sucesso.");
    } catch (err) {
      if (err instanceof DeleteMealException) {
        return responseHandler.badRequest(
          "Erro de validação nos dados fornecidos para deletar a refeição.",
          err.message
        );
      }

      return responseHandler.internalError("Erro interno no servidor.");
    }
  }
}
