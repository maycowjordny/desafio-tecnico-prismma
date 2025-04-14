import { makeUpdateMeal } from "@/app/api/application/factories/make-update-meal-factory";
import { UpdateMealException } from "@/app/api/application/use-cases/meal/errors/update-meal-exception";
import { Meal } from "@/app/api/domain/entities/meal-entity";
import { responseHandler } from "@/utils/response-handler";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { authOptions } from "../../database/lib/auth-options";
import { updateMealSchema } from "../../zod/schema/update-meal-schema";

export class MealUpdateController {
  async update(request: NextRequest, mealId: string) {
    try {
      const session = await getServerSession(authOptions);

      const userId = session?.user?.id;

      if (!userId) {
        return responseHandler.unauthorized("Usuário não autenticado.");
      }

      const body = await request.json();
      const validatedBody = updateMealSchema.parse(body);

      if (!mealId) {
        return responseHandler.notFound(
          "ID da refeição não fornecido para atualização."
        );
      }

      const updateMealUseCase = makeUpdateMeal();

      const mealUpdated = new Meal({
        id: mealId,
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
        "Erro interno ao atualizar a refeição."
      );
    }
  }
}
