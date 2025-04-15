import { EstimateCaloriesUseCase } from "@/app/api/application/use-cases/meal/estimate-calories-use-case";
import { ensureAuthenticated } from "@/utils/get-session-user-id";
import { responseHandler } from "@/utils/response-handler";
import { NextRequest } from "next/server";
import { estimateSchema } from "../../zod/schema/estimate-calories-schema";

export class MealCaloriesEstimateController {
  async estimate(request: NextRequest) {
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
      return responseHandler.internalError(`${err}`);
    }
  }
}
