import { makeFindMealByType } from "@/app/api/application/factories/make-find-meal-by-type-factory";
import { FindMealByTypeException } from "@/app/api/application/use-cases/meal/errors/find-meal-by-type-exception";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { mealTypeSchema } from "../../zod/schema/type-meal-schema";

export class FindMealByTypeController {
  async listByType(request: NextRequest) {
    try {
      const { searchParams } = new URL(request.url);

      const type = searchParams.get("type");

      const validatedData = mealTypeSchema.parse({ type });

      const findMealByTypeUseCase = makeFindMealByType();

      const meals = await findMealByTypeUseCase.execute(validatedData.type);

      return NextResponse.json({ meals }, { status: 200 });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return NextResponse.json(
          { message: "Tipo de refeição inválido", errors: err.errors },
          { status: 400 }
        );
      }

      if (err instanceof FindMealByTypeException) {
        return NextResponse.json({ message: err.message }, { status: 400 });
      }

      return NextResponse.json(
        { message: "Erro interno no servidor" },
        { status: 500 }
      );
    }
  }
}
