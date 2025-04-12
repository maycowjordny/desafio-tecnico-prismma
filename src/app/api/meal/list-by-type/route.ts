import { NextRequest } from "next/server";
import { FindMealByTypeController } from "../../infra/controller/meal/find-meal-by-type-controller";

const controller = new FindMealByTypeController();

export async function GET(request: NextRequest) {
  return controller.listByType(request);
}
