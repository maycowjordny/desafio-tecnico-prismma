import { NextRequest } from "next/server";
import { FindMealByIdController } from "../../infra/controller/meal/find-meal-by-id-controller";

const controller = new FindMealByIdController();

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  return controller.listById(id);
}
