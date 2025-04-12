import { NextRequest } from "next/server";
import { MealCreateController } from "../../infra/controller/meal/create-meal-controller";

const controller = new MealCreateController();

export async function POST(request: NextRequest) {
  return controller.handle(request);
}
