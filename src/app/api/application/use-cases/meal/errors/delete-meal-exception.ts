import { DomainError } from "@/app/api/domain/error/domain-error";

export class DeleteMealException extends Error implements DomainError {
  constructor(error?: string) {
    super(`Erro ao deletar refeição: '${error ? error : "generic"}'.`);
    this.name = "DeleteMealException";
  }
}
