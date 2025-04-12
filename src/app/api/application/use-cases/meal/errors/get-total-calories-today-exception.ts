import { DomainError } from "@/app/api/domain/error/domain-error";

export class GetTotalCaloriesTodaException
  extends Error
  implements DomainError
{
  constructor(error?: string) {
    super(
      `Erro ao buscar o total de calorias do dia: '${
        error ? error : "generic"
      }'.`
    );
    this.name = "GetTotalCaloriesTodaException";
  }
}
