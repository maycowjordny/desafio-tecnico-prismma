import { ensureAuthenticated } from "@/utils/get-session-user-id";
import { responseHandler } from "@/utils/response-handler";
import { NextRequest } from "next/server";
import { EstimateCaloriesUseCase } from "../../application/use-cases/meal/estimate-calories-use-case";
import { estimateSchema } from "../../infra/zod/schema/estimate-calories-schema";

export async function POST(request: NextRequest) {
  try {
    await ensureAuthenticated();

    const body = await request.json();

    const data = estimateSchema.parse(body);

    const estimateCaloriesUseCase = new EstimateCaloriesUseCase();

    const calories = await estimateCaloriesUseCase.execute(
      data.mealDescription
    );

    return responseHandler.success({ calories });
  } catch (err) {
    return responseHandler.internalError(
      `Erro interno do servidor ao estimar calorias: ${err}`
    );
  }
}
