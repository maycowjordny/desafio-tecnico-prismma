import { makeUpdateMeal } from "@/app/api/application/factories/make-update-meal-factory";
import { UpdateMealException } from "@/app/api/application/use-cases/meal/errors/update-meal-exception";
import { Meal } from "@/app/api/domain/entities/meal-entity";
import { NextRequest, NextResponse } from "next/server";
import { updateMealSchema } from "../../zod/schema/update-meal-schema";

export class MealUpdateController {
  async update(request: NextRequest, mealId: string) {
    try {
      const body = await request.json();
      const validatedBody = updateMealSchema.parse(body);

      const updateMealUseCase = makeUpdateMeal();

      const mealUpdated = new Meal({
        id: mealId,
        ...validatedBody,
      });

      const updatedMeal = await updateMealUseCase.execute(mealUpdated);

      return NextResponse.json({ meal: updatedMeal }, { status: 200 });
    } catch (err) {
      if (err instanceof UpdateMealException) {
        return NextResponse.json({ message: err.message }, { status: 400 });
      }

      return NextResponse.json(
        { message: "Erro interno ao atualizar a refeição." },
        { status: 500 }
      );
    }
  }
}
