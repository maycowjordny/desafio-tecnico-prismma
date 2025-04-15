import { ensureAuthenticated } from "@/utils/get-session-user-id";
import { responseHandler } from "@/utils/response-handler";
import { NextRequest } from "next/server";
import { AnalyzeMealImageUseCase } from "../../application/use-cases/meal/analyze-meal-image-use-case";

export async function POST(request: NextRequest) {
  try {
    await ensureAuthenticated();

    const body = await request.json();
    const { imageBase64 } = body;

    if (!imageBase64) {
      return responseHandler.badRequest("Imagem da refeição é obrigatória.");
    }

    const analyzeMealImageUseCase = new AnalyzeMealImageUseCase();
    const result = await analyzeMealImageUseCase.execute(imageBase64);

    return responseHandler.success({
      description: result.description,
      calories: result.calories,
      mealName: result.mealName,
    });
  } catch (err) {
    return responseHandler.internalError(`Erro interno do servidor: ${err}`);
  }
}
