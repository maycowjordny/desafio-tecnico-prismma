import { makeDeleteMeal } from "@/app/api/application/factories/make-delete-meal-factory";
import { DeleteMealException } from "@/app/api/application/use-cases/meal/errors/delete-meal-exception";
import { NextRequest, NextResponse } from "next/server";

export class MealDeleteController {
  async delete(request: NextRequest, params: { id: string }) {
    try {
      const { id } = params;

      const deleteMealUseCase = makeDeleteMeal();
      await deleteMealUseCase.execute(id);

      return NextResponse.json(
        { message: "Refeição excluída com sucesso." },
        { status: 200 }
      );
    } catch (err) {
      if (err instanceof DeleteMealException) {
        return NextResponse.json({ message: err.message }, { status: 400 });
      }

      return NextResponse.json(
        { message: "Erro interno no servidor." },
        { status: 500 }
      );
    }
  }
}
