import { NextRequest } from "next/server";
import { MealImageAnalysisController } from "../../infra/controller/meal/analyze-meal-image-controller";

const controller = new MealImageAnalysisController();

export async function POST(request: NextRequest) {
  return controller.analyze(request);
}
