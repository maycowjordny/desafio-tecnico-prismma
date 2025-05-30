import { makeDeleteMeal } from "@/app/api/application/factories/make-delete-meal-factory";
import { DeleteMealException } from "@/app/api/application/use-cases/meal/errors/delete-meal-exception";
import { ensureAuthenticated } from "@/utils/get-session-user-id";
import { responseHandler } from "@/utils/response-handler";
import { NextRequest } from "next/server";

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const userId = await ensureAuthenticated();

    if (!id) {
      return responseHandler.notFound("Refeição não encontrada.");
    }

    const deleteMealUseCase = makeDeleteMeal();

    await deleteMealUseCase.execute(id, userId);

    return responseHandler.success("Refeição excluída com sucesso.");
  } catch (err) {
    if (err instanceof DeleteMealException) {
      return responseHandler.badRequest(
        "Erro de validação nos dados fornecidos para deletar a refeição.",
        err.message
      );
    }

    return responseHandler.internalError(
      `Erro interno do servidor ao deletar refeição: ${err}`
    );
  }
}
