import { MealTag } from "./MealTag";

export type Meal = {
  id: number;
  name: string;
  restaurantName: string;
  metersAway: number;
  calories: number;
  proteinGrams: number;
  price?: number;
  tags: MealTag[];
};