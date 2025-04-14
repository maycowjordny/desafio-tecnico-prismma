import { MealTypeEnum } from "@/app/api/domain/enum/meal-type-enum";
import { theme } from "@/theme/theme";
import { JSX } from "@emotion/react/jsx-runtime";
import { Apple, Coffee, Soup, Utensils } from "lucide-react";

export const mealIcons: Record<MealTypeEnum, JSX.Element> = {
  [MealTypeEnum.BREAKFAST]: (
    <Coffee size={64} color={theme.palette.primary.main} />
  ),
  [MealTypeEnum.LUNCH]: (
    <Utensils size={64} color={theme.palette.primary.main} />
  ),
  [MealTypeEnum.AFTERNOON_SNACK]: (
    <Apple size={64} color={theme.palette.primary.main} />
  ),
  [MealTypeEnum.DINNER]: <Soup size={64} color={theme.palette.primary.main} />,
};
