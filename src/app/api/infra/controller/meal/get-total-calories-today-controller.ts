import { makeGetTotalCaloriesToday } from "@/app/api/application/factories/make-get-total-calories-factory";
import { GetTotalCaloriesTodaException } from "@/app/api/application/use-cases/meal/errors/get-total-calories-today-exception";
import { NextResponse } from "next/server";

export class GetTotalCaloriesTodayController {
  async get(): Promise<NextResponse> {
    try {
      const getTotalCaloriesTodayUseCase = makeGetTotalCaloriesToday();

      const totalCalories = await getTotalCaloriesTodayUseCase.execute();

      return NextResponse.json({ totalCalories }, { status: 200 });
    } catch (err) {
      if (err instanceof GetTotalCaloriesTodaException) {
        return NextResponse.json({ message: err.message }, { status: 400 });
      }
      return NextResponse.json(
        { message: "Erro ao calcular as calorias de hoje" },
        { status: 500 }
      );
    }
  }
}
