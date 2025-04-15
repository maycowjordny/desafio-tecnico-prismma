import { DomainError } from "@/app/api/domain/error/domain-error";

export class InvalidCaloriesNumberException
  extends Error
  implements DomainError
{
  constructor(error?: string) {
    super(`Número de calorias inválido'${error ? error : "generic"}'.`);
    this.name = "InvalidCaloriesNumberException";
  }
}
