import { makeDeleteMeal } from "@/app/api/application/factories/make-delete-meal-factory";
import { DeleteMealException } from "@/app/api/application/use-cases/meal/errors/delete-meal-exception";
import { responseHandler } from "@/utils/response-handler";
import { getServerSession } from "next-auth";
import { authOptions } from "../../database/lib/auth-options";

export class MealDeleteController {
  async delete(mealId: string) {
    try {
      const session = await getServerSession(authOptions);
      const userId = session?.user?.id;

      if (!userId) {
        return responseHandler.unauthorized("Usuário não autenticado.");
      }

      if (!mealId) {
        return responseHandler.notFound("Refeição não encontrada.");
      }

      const deleteMealUseCase = makeDeleteMeal();

      await deleteMealUseCase.execute(mealId, userId);

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
