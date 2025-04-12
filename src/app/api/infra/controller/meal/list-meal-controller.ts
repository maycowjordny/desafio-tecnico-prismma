import { makeListMeals } from "@/app/api/application/factories/make-list-meal-factory";
import { ListMealsException } from "@/app/api/application/use-cases/meal/errors/list-meals-exception";
import { NextRequest, NextResponse } from "next/server";

export class MealListController {
  async list(_: NextRequest) {
    try {
      const listMealsUseCase = makeListMeals();

      const meals = await listMealsUseCase.execute();

      return NextResponse.json({ meals }, { status: 200 });
    } catch (err) {
      if (err instanceof ListMealsException) {
        return NextResponse.json({ message: err.message }, { status: 400 });
      }

      return NextResponse.json(
        { message: "Erro interno no servidor." },
        { status: 500 }
      );
    }
  }
}
