import { DomainError } from "@/app/api/domain/error/domain-error";

export class ListMealsException extends Error implements DomainError {
  constructor(error?: string) {
    super(`Erro ao listar refeições: '${error ?? "generic"}'.`);
    this.name = "ListMealsException";
  }
}
