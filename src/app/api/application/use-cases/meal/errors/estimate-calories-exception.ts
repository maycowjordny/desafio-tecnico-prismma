import { DomainError } from "@/app/api/domain/error/domain-error";

export class EstimateCaloriesException extends Error implements DomainError {
  constructor(error?: string) {
    super(`Erro ao estimar refeição: '${error ? error : "generic"}'.`);
    this.name = "EstimateCaloriesException";
  }
}
