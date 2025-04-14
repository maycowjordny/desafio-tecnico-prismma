import { makeGetTotalCaloriesToday } from "@/app/api/application/factories/make-get-total-calories-factory";
import { GetTotalCaloriesTodaException } from "@/app/api/application/use-cases/meal/errors/get-total-calories-today-exception";
import { responseHandler } from "@/utils/response-handler";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../database/lib/auth-options";

export class GetTotalCaloriesTodayController {
  async get(): Promise<NextResponse> {
    try {
      const session = await getServerSession(authOptions);
      const userId = session?.user?.id;

      if (!userId) {
        return responseHandler.unauthorized("Usuário não autenticado.");
      }

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
