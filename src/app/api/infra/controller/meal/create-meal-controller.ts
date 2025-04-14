import { makeCreateMeal } from "@/app/api/application/factories/make-create-meal-factory";
import { CreateMealException } from "@/app/api/application/use-cases/meal/errors/create-meal-exception";
import { Meal } from "@/app/api/domain/entities/meal-entity";
import { responseHandler } from "@/utils/response-handler";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { authOptions } from "../../database/lib/auth-options";
import { mealSchema } from "../../zod/schema/create-meal-schema";

export class MealCreateController {
  async create(request: NextRequest) {
    try {
      const session = await getServerSession(authOptions);

      const userId = session?.user?.id;

      if (!userId) {
        return responseHandler.unauthorized("Usuário não autenticado.");
      }

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
      return responseHandler.internalError("Erro interno");
    }
  }
}
