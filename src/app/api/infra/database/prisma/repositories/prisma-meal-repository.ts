import { Meal } from "@/app/api/domain/entities/meal-entity";
import dayjs from "dayjs";
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

  async findMealsOfToday(): Promise<Meal[]> {
    const todayStart = dayjs().startOf("day").toDate();
    const todayEnd = dayjs().endOf("day").toDate();

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

  async findById(id: string): Promise<Meal | null> {
    const result = await prisma.meal.findUnique({
      where: {
        id,
      },
    });

    return result && MealMapper.toDomain(result);
  }
}
