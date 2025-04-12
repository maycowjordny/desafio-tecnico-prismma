import { GetTotalCaloriesTodayController } from "@/app/api/infra/controller/meal/get-total-calories-today-controller";

const controller = new GetTotalCaloriesTodayController();

export async function GET() {
  return controller.get();
}
