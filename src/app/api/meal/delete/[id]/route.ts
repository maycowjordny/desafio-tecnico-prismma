import { MealDeleteController } from "@/app/api/infra/controller/meal/delete-meal-controller";
import { NextRequest } from "next/server";

const controller = new MealDeleteController();

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  return controller.delete(id);
}
