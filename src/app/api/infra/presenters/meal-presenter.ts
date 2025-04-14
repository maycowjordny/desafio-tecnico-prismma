import { Meal } from "../../domain/entities/meal-entity";

export function mealPresenter(meal: Meal) {
  return {
    id: meal.id,
    name: meal.name,
    type: mapMealType(meal.type),
    description: meal.description,
    feedingAt: meal.feedingAt,
    calories: meal.calories,
  };
}

function mapMealType(type: string) {
  const types: Record<string, string> = {
    BREAKFAST: "Café da manhã",
    LUNCH: "Almoço",
    AFTERNOON_SNACK: "Lanche da tarde",
    DINNER: "Janta",
  };

  return types[type] || "Desconhecido";
}
