import { makeFindMealById } from "@/app/api/application/factories/make-find-meal-by-id-factory";
import { FindMealByIdException } from "@/app/api/application/use-cases/meal/errors/find-meal-by-id-exception";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { mealPresenter } from "../../presenters/meal-presenter";

export class FindMealByIdController {
  async listById(request: NextRequest, params: { id: string }) {
    try {
      const { id } = params;

      const findMealByIdUseCase = makeFindMealById();

      const meals = await findMealByIdUseCase.execute(id);

      if (!meals) {
        return NextResponse.json(
          { message: "Refeição não encontrada." },
          { status: 404 }
        );
      }

      const mealFormatted = mealPresenter(meals);

      return NextResponse.json({ meal: mealFormatted }, { status: 200 });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return NextResponse.json(
          { message: "Tipo de refeição inválido", errors: err.errors },
          { status: 400 }
        );
      }

      if (err instanceof FindMealByIdException) {
        return NextResponse.json({ message: err.message }, { status: 400 });
      }

      return NextResponse.json(
        { message: "Erro interno no servidor" },
        { status: 500 }
      );
    }
  }
}
