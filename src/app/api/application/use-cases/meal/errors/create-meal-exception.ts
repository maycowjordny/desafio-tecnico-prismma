import { DomainError } from "@/app/api/domain/error/domain-error";

export class CreateMealException extends Error implements DomainError {
  constructor(error?: string) {
    super(`Erro ao criar refeição: '${error ? error : "generic"}'.`);
    this.name = "CreateMealException";
  }
}
