import { NextRequest } from "next/server";
import { MealDeleteController } from "../../../infra/controller/meal/delete-meal-controller";

const controller = new MealDeleteController();

export async function DELETE(request: NextRequest) {
  return controller.delete(request);
}
