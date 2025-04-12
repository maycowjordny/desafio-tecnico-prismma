import { DomainError } from "@/app/api/domain/error/domain-error";

export class FindMealByIdException extends Error implements DomainError {
  constructor(error?: string) {
    super(`Erro ao buscar refeição: '${error ? error : "generic"}'.`);
    this.name = "FindMealByIdException";
  }
}
