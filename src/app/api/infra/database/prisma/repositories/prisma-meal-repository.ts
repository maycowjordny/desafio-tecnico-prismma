import { Meal } from "@/app/api/domain/entities/meal-entity";
import { MealType } from "@/generated/prisma";
import { endOfDay, startOfDay } from "date-fns";
import { prisma } from "../../lib/prisma";
import { MealRepository } from "../../repositories/meal-repository";
import { CreateMealMapper } from "../mappers/meal/create-meal-mapper";
import { MealMapper } from "../mappers/meal/meal-mapper";
import { UpdateMealMapper } from "../mappers/meal/update-meal-mapper";

export class PrismaMealRepository implements MealRepository {
  async create(meal: Meal): Promise<Meal> {
    const result = await prisma.meal.create({
      data: CreateMealMapper.convertToPrisma(meal),
    });

    return MealMapper.toDomain(result);
  }

  async findAll(): Promise<Meal[]> {
    const result = await prisma.meal.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return result.map(MealMapper.toDomain);
  }

  async update(meal: Meal): Promise<Meal> {
    const result = await prisma.meal.update({
      where: {
        id: meal.id,
      },
      data: UpdateMealMapper.convertToPrisma(meal),
    });

    return MealMapper.toDomain(result);
  }

  async delete(id: string): Promise<null> {
    await prisma.meal.delete({
      where: {
        id,
      },
    });

    return null;
  }

  async findByType(type: string): Promise<Meal[]> {
    const result = await prisma.meal.findMany({
      where: {
        type: type as MealType,
      },
    });

    return result.map(MealMapper.toDomain);
  }

  async findMealsOfToday(): Promise<Meal[]> {
    const todayStart = startOfDay(new Date());
    const todayEnd = endOfDay(new Date());

    const meals = await prisma.meal.findMany({
      where: {
        feedingAt: {
          gte: todayStart,
          lte: todayEnd,
        },
      },
    });

    return meals.map(MealMapper.toDomain);
  }
}
