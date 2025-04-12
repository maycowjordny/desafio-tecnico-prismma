import { DomainError } from "@/app/api/domain/error/domain-error";

export class FindMealByTypeException extends Error implements DomainError {
  constructor(error?: string) {
    super(`Erro ao buscar pelo tipo refeição: '${error ? error : "generic"}'.`);
    this.name = "FindMealByTypeException";
  }
}
