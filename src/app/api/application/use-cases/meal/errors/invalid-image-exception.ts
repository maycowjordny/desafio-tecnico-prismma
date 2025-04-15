import { DomainError } from "@/app/api/domain/error/domain-error";

export class InvalidImageException extends Error implements DomainError {
  constructor(error?: string) {
    super(`Erro validar imagem base64 '${error ? error : "generic"}'.`);
    this.name = "InvalidImageException";
  }
}
