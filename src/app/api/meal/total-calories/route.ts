import { ensureAuthenticated } from "@/utils/get-session-user-id";
import { responseHandler } from "@/utils/response-handler";
import { makeGetTotalCaloriesToday } from "../../application/factories/make-get-total-calories-factory";
import { GetTotalCaloriesTodaException } from "../../application/use-cases/meal/errors/get-total-calories-today-exception";

export async function GET() {
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
      `Erro interno do servidor ao pegar o total de calorias diárias: ${err}`
    );
  }
}
