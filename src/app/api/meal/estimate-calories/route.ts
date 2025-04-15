import { NextRequest } from "next/server";
import { MealCaloriesEstimateController } from "../../infra/controller/meal/meals-estimate-calories-controller";

const controller = new MealCaloriesEstimateController();

export async function POST(request: NextRequest) {
  return controller.estimate(request);
}
