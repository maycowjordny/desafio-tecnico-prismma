import { makeListMeals } from "@/app/api/application/factories/make-list-meal-factory";
import { ListMealsException } from "@/app/api/application/use-cases/meal/errors/list-meals-exception";
import { NextRequest, NextResponse } from "next/server";
import { mealPresenter } from "../../presenters/meal-presenter";

export class MealListController {
  async list(_: NextRequest) {
    try {
      const listMealsUseCase = makeListMeals();

      const meals = await listMealsUseCase.execute();

      const formattedMeals = meals.map(mealPresenter);

      return NextResponse.json({ meals: formattedMeals }, { status: 200 });
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
