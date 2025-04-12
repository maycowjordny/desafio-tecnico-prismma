import { makeCreateMeal } from "@/app/api/application/factories/make-create-meal-factory";
import { CreateMealException } from "@/app/api/application/use-cases/meal/errors/create-meal-exception";
import { Meal } from "@/app/api/domain/entities/meal-entity";
import { NextRequest, NextResponse } from "next/server";
import { mealSchema } from "../../zod/schema/create-meal-schema";

export class MealCreateController {
  async handle(request: NextRequest) {
    try {
      const body = await request.json();
      const data = mealSchema.parse(body);

      const createMeal = makeCreateMeal();

      const meal = new Meal({ ...data });

      const result = await createMeal.execute(meal);

      return NextResponse.json(result, { status: 201 });
    } catch (err) {
      if (err instanceof CreateMealException) {
        return NextResponse.json({ message: err.message }, { status: 400 });
      }
      return NextResponse.json({ message: "Erro interno" }, { status: 500 });
    }
  }
}
