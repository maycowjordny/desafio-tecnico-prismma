import { DomainError } from "@/app/api/domain/error/domain-error";

export class InvalidResponseException extends Error implements DomainError {
  constructor(error?: string) {
    super(`Resposta inválida: '${error ? error : "generic"}'.`);
    this.name = "InvalidResponseException";
  }
}
