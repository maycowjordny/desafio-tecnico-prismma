import { NextRequest } from "next/server";
import { MealListController } from "../infra/controller/meal/list-meal-controller";

const controller = new MealListController();

export async function GET(request: NextRequest) {
  return controller.list(request);
}
