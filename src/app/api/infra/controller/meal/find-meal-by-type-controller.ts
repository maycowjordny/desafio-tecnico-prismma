import { makeFindMealByType } from "@/app/api/application/factories/make-find-meal-by-type-factory";
import { FindMealByTypeException } from "@/app/api/application/use-cases/meal/errors/find-meal-by-type-exception";
import { responseHandler } from "@/utils/response-handler";
import { NextRequest } from "next/server";
import { z } from "zod";
import { mealTypeSchema } from "../../zod/schema/type-meal-schema";

export class FindMealByTypeController {
  async listByType(request: NextRequest) {
    try {
      const { searchParams } = new URL(request.url);

      const type = searchParams.get("type");

      const validatedData = mealTypeSchema.parse({ type });

      const findMealByTypeUseCase = makeFindMealByType();

      const meals = await findMealByTypeUseCase.execute(validatedData.type);

      return responseHandler.success({ meals });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return responseHandler.badRequest(
          "Tipo de refeição inválido",
          err.errors
        );
      }

      if (err instanceof FindMealByTypeException) {
        return responseHandler.badRequest(
          "Erro de validação nos dados fornecidos para encontrar a refeição por tipo.",
          err.message
        );
      }

      return responseHandler.internalError("Erro interno no servidor");
    }
  }
}
