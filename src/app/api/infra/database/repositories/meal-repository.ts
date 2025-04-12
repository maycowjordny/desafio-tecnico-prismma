import { Meal } from "@/app/api/domain/entities/meal-entity";

export interface MealRepository {
  create(meal: Meal): Promise<Meal>;
  findAll(): Promise<Meal[]>;
  findByType(type: string): Promise<Meal[]>;
  findMealsOfToday(): Promise<Meal[]>;
  update(meal: Meal): Promise<Meal>;
  delete(id: string): Promise<null>;
}
