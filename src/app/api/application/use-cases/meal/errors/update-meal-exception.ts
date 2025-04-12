import { DomainError } from "@/app/api/domain/error/domain-error";

export class UpdateMealException extends Error implements DomainError {
  constructor(error?: string) {
    super(`Erro ao atualizar refeição: '${error ? error : "generic"}'.`);
    this.name = "UpdateMealException";
  }
}
