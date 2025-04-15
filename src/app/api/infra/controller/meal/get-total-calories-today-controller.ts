import { makeGetTotalCaloriesToday } from "@/app/api/application/factories/make-get-total-calories-factory";
import { GetTotalCaloriesTodaException } from "@/app/api/application/use-cases/meal/errors/get-total-calories-today-exception";
import { ensureAuthenticated } from "@/utils/get-session-user-id";
import { responseHandler } from "@/utils/response-handler";
import { NextResponse } from "next/server";

export class GetTotalCaloriesTodayController {
  async get(): Promise<NextResponse> {
    try {
      const userId = await ensureAuthenticated();

      const getTotalCaloriesTodayUseCase = makeGetTotalCaloriesToday();

      const totalCalories = await getTotalCaloriesTodayUseCase.execute(userId);

      return responseHandler.success({ totalCalories });
    } catch (err) {
      if (err instanceof GetTotalCaloriesTodaException) {
        return responseHandler.badRequest(
          "Erro de validação nos dados fornecidos para encontrar o total de calorias diária.",
          err.message
        );
      }

      return responseHandler.internalError(
        "Erro de validação nos dados fornecidos para encontrar a refeição por tipo."
      );
    }
  }
}
