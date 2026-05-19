import { MealTag } from './MealTag';

export type MealDetail = {
    id: number;
    name: string;
    restaurantName: string;
    calories: number;
    proteinGrams: number;
    price?: number;
    tags: MealTag[];
    fatGrams: number;
    carbsGrams: number;
    restaurantAddress: string;
};