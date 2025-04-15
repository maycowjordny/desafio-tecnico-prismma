export const MEAL_ESTIMATE_CALORIES_PROMPT = (
  mealDescription: string
) => `Estime o total de calorias para esta refeição: ${mealDescription}. 
      Responda APENAS com o número estimado de calorias, sem texto adicional ou formatação.`;
