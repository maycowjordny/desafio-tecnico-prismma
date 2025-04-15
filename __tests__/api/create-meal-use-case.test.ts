import { CreateMealUseCase } from "../../src/app/api/application/use-cases/meal/create-meal-use-case";
import { Meal } from "../../src/app/api/domain/entities/meal-entity";
import { MealTypeEnum } from "../../src/app/api/domain/enum/meal-type-enum";
import { MealInMemory } from "../../src/app/api/infra/database/in-memory-repositories/in-memory-repository";

describe("CreateMealUseCase", () => {
  let mealRepository: MealInMemory;
  let sut: CreateMealUseCase;

  beforeEach(async () => {
    mealRepository = new MealInMemory();
    sut = new CreateMealUseCase(mealRepository);
  });

  it("should be able to create meal", async () => {
    const meals = Meal.create({
      id: "1",
      calories: 500,
      feedingAt: new Date(),
      name: "test",
      description: "Arroz e frango",
      type: MealTypeEnum.BREAKFAST,
      userId: "2",
    });

    const output = await sut.execute(meals);

    expect(output).not.toBeUndefined();
    expect(output).toMatchObject({
      name: "test",
    });
  });
});
