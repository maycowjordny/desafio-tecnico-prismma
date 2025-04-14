import { Entity } from "../../core/entity";
import { Replace } from "../../core/logic/replace";
import { MealTypeEnum } from "../enum/meal-type-enum";

export type MealProps = {
  id?: string;
  userId: string;
  name: string;
  description?: string;
  calories: number;
  feedingAt: Date;
  type: MealTypeEnum;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Meal extends Entity<MealProps> {
  get id() {
    return this.props.id;
  }

  get userId() {
    return this.props.userId;
  }

  get name() {
    return this.props.name;
  }

  get description() {
    return this.props.description;
  }

  get calories() {
    return this.props.calories;
  }

  get feedingAt() {
    return this.props.feedingAt;
  }

  get type() {
    return this.props.type;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  static create(
    props: Replace<
      MealProps,
      {
        createdAt?: Date;
        updatedAt?: Date;
      }
    >
  ) {
    const meal = new Meal({
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    });

    return meal;
  }
}
