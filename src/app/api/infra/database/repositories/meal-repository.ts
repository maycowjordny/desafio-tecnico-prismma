import { Meal } from "@/app/api/domain/entities/meal-entity";

export interface MealRepository {
  create(meal: Meal): Promise<Meal>;
  findAll(userId: string): Promise<Meal[]>;
  findById(mealId: string, userId: string): Promise<Meal | null>;
  findMealsOfToday(userId: string): Promise<Meal[]>;
  update(meal: Meal): Promise<Meal>;
  delete(mealId: string, userId: string): Promise<null>;
}
