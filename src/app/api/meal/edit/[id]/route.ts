import { NextRequest } from "next/server";
import { MealUpdateController } from "../../../infra/controller/meal/update-meal-controller";

const controller = new MealUpdateController();

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  return controller.update(request, id);
}
