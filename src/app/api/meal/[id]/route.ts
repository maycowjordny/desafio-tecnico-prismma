import { ensureAuthenticated } from "@/utils/get-session-user-id";
import { responseHandler } from "@/utils/response-handler";
import { NextRequest } from "next/server";
import { z } from "zod";
import { makeFindMealById } from "../../application/factories/make-find-meal-by-id-factory";
import { FindMealByIdException } from "../../application/use-cases/meal/errors/find-meal-by-id-exception";
import { mealPresenter } from "../../infra/presenters/meal-presenter";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const userId = await ensureAuthenticated();

    if (!id) {
      return responseHandler.notFound("Refeição não encontrada.");
    }

    const findMealByIdUseCase = makeFindMealById();

    const meals = await findMealByIdUseCase.execute(id, userId);

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

    return responseHandler.internalError(
      `Erro interno do servidor ao encontrar o prato pelo id: ${err}`
    );
  }
}
