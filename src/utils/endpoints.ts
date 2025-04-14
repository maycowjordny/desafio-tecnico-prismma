const MEAL_BASE_PATH = "/api/meal";

export const endpoints = {
  meal: {
    add: `${MEAL_BASE_PATH}/add`,
    list: `${MEAL_BASE_PATH}`,
    totalCalories: `${MEAL_BASE_PATH}/total-calories`,
    delete: (mealId: string) => `${MEAL_BASE_PATH}/delete/${mealId}`,
    findById: (mealId: string) => `${MEAL_BASE_PATH}/${mealId}`,
    update: (mealId: string) => `${MEAL_BASE_PATH}/edit/${mealId}`,
  },
};
