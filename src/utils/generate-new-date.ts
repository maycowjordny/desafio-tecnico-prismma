export function generateNewDate(value: Date | undefined): Date {
  return value ?? new Date();
}
