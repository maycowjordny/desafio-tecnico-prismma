import { MEAL_ESTIMATE_CALORIES_PROMPT } from "@/utils/prompts/estimate-calories-prompt";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { EstimateCaloriesException } from "./errors/estimate-calories-exception";
import { InvalidCaloriesNumberException } from "./errors/invalid-number-calories-exception";

export class EstimateCaloriesUseCase {
  async execute(mealDescription: string): Promise<number> {
    try {
      const genAI = new GoogleGenerativeAI(
        process.env.GEMINI_SECRET_KEY as string
      );

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = MEAL_ESTIMATE_CALORIES_PROMPT(mealDescription);

      const result = await model.generateContent(prompt);

      const response = result.response;

      const text = response.text();

      const calories = this.parseCalories(text);

      return calories;
    } catch (error) {
      throw new EstimateCaloriesException();
    }
  }

  private parseCalories(text: string): number {
    const numericString = text.replace(/\D/g, "");
    const calories = parseInt(numericString);

    if (isNaN(calories)) throw new InvalidCaloriesNumberException();

    return calories;
  }
}
