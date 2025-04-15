import { DomainError } from "@/app/api/domain/error/domain-error";

export class AnalizeImageException extends Error implements DomainError {
  constructor(error?: string) {
    super(`Erro ao analisar imagem: '${error ? error : "generic"}'.`);
    this.name = "AnalizeImageException";
  }
}
