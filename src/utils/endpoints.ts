const MEAL_BASE_PATH = "/api/meal";

export const endpoints = {
  meal: {
    add: `${MEAL_BASE_PATH}/add`,
    list: `${MEAL_BASE_PATH}`,
    totalCalories: `${MEAL_BASE_PATH}/total-calories`,
    analyzeMealImage: `${MEAL_BASE_PATH}/analyze-image`,
    estimateCalories: `${MEAL_BASE_PATH}/estimate-calories`,
    delete: (mealId: string) => `${MEAL_BASE_PATH}/delete/${mealId}`,
    findById: (mealId: string) => `${MEAL_BASE_PATH}/${mealId}`,
    update: (mealId: string) => `${MEAL_BASE_PATH}/edit/${mealId}`,
  },
};
