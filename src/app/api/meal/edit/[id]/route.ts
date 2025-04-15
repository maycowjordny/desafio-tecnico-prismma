import { makeUpdateMeal } from "@/app/api/application/factories/make-update-meal-factory";
import { UpdateMealException } from "@/app/api/application/use-cases/meal/errors/update-meal-exception";
import { Meal } from "@/app/api/domain/entities/meal-entity";
import { updateMealSchema } from "@/app/api/infra/zod/schema/update-meal-schema";
import { ensureAuthenticated } from "@/utils/get-session-user-id";
import { responseHandler } from "@/utils/response-handler";
import { NextRequest } from "next/server";

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const userId = await ensureAuthenticated();

    const body = await request.json();
    const validatedBody = updateMealSchema.parse(body);

    if (!id) {
      return responseHandler.notFound(
        "ID da refeição não fornecido para atualização."
      );
    }

    const updateMealUseCase = makeUpdateMeal();

    const mealUpdated = new Meal({
      id,
      userId,
      ...validatedBody,
    });

    await updateMealUseCase.execute(mealUpdated);

    return responseHandler.success({
      message: "Refeição atualizada com sucesso.",
    });
  } catch (err) {
    if (err instanceof UpdateMealException) {
      return responseHandler.badRequest(
        "Erro de validação nos dados fornecidos para atualizar refeição.",
        err.message
      );
    }

    return responseHandler.internalError(
      `Erro interno ao atualizar do servidor: ${err}`
    );
  }
}
