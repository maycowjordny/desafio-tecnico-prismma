import { Meal } from "@/app/api/domain/entities/meal-entity";

export interface MealRepository {
  create(meal: Meal): Promise<Meal>;
  findAll(): Promise<Meal[]>;
  findById(id: string): Promise<Meal | null>;
  update(meal: Meal): Promise<Meal>;
  delete(id: string): Promise<null>;
}
