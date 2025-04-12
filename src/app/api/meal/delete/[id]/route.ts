import { NextRequest } from "next/server";
import { MealDeleteController } from "../../../infra/controller/meal/delete-meal-controller";

const controller = new MealDeleteController();

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return controller.delete(request, params);
}
