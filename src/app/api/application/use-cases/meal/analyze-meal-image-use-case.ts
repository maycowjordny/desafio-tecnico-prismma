import { MealAnalysisResponse } from "@/app/api/domain/interfaces/analize-meal-response";
import { MEAL_IMAGE_ANALYSIS_PROMPT } from "@/utils/prompts/analize-image-prompt";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { AnalizeImageException } from "./errors/analyze-image-exception";
import { InvalidImageException } from "./errors/invalid-image-exception";
import { InvalidResponseException } from "./errors/invalid-response-exception";

export class AnalyzeMealImageUseCase {
  async execute(imageBase64: string): Promise<MealAnalysisResponse> {
    try {
      const genAI = new GoogleGenerativeAI(
        process.env.GEMINI_SECRET_KEY as string
      );

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const { mimeType, base64Data } = this.extractBase64Data(imageBase64);

      const prompt = MEAL_IMAGE_ANALYSIS_PROMPT;

      const response = await model.generateContent({
        contents: [
          {
            parts: [
              {
                inlineData: {
                  mimeType,
                  data: base64Data,
                },
              },
              {
                text: prompt,
              },
            ],
            role: "user",
          },
        ],
      });

      const responseText =
        response.response.candidates?.[0].content.parts?.[0].text ?? "";
      return this.parseResponse(responseText);
    } catch (error) {
      throw new AnalizeImageException();
    }
  }

  private parseResponse(text: string): MealAnalysisResponse {
    const cleanText = text.replace(/\*\*/g, "").replace(/\n/g, " ");

    const nameMatch = cleanText.match(/NOME: (.+?) \|/i);
    const descriptionMatch = cleanText.match(/DESCRIÇÃO: (.+?) \|/i);
    const caloriesMatch = cleanText.match(/CALORIAS: (\d+)/i);

    if (!nameMatch || !descriptionMatch || !caloriesMatch) {
      throw new InvalidResponseException();
    }

    return {
      mealName: nameMatch[1].trim(),
      description: descriptionMatch[1].trim(),
      calories: parseInt(caloriesMatch[1], 10),
    };
  }

  private extractBase64Data(dataUrl: string): {
    mimeType: string;
    base64Data: string;
  } {
    const match = dataUrl.match(/^data:(image\/\w+);base64,(.+)$/);

    if (!match) throw new InvalidImageException();

    const [, mimeType, base64Data] = match;
    return { mimeType, base64Data };
  }
}
