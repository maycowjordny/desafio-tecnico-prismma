import { ensureAuthenticated } from "@/utils/get-session-user-id";
import { responseHandler } from "@/utils/response-handler";
import { NextRequest } from "next/server";
import { makeCreateMeal } from "../../application/factories/make-create-meal-factory";
import { CreateMealException } from "../../application/use-cases/meal/errors/create-meal-exception";
import { Meal } from "../../domain/entities/meal-entity";
import { mealSchema } from "../../infra/zod/schema/create-meal-schema";

export async function POST(request: NextRequest) {
  try {
    const userId = await ensureAuthenticated();

    const body = await request.json();
    const data = mealSchema.parse(body);

    const createMeal = makeCreateMeal();

    const meal = new Meal({
      ...data,
      userId,
    });

    await createMeal.execute(meal);

    return responseHandler.success("Refeição criada com sucesso.");
  } catch (err) {
    if (err instanceof CreateMealException) {
      return responseHandler.badRequest(
        "Erro de validação nos dados fornecidos para criação da refeição.",
        err.message
      );
    }
    return responseHandler.internalError(
      `Erro interno do servidor ao criar refeição:${err}`
    );
  }
}
