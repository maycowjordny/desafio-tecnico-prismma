import { PrismaClient } from "@/generated/prisma";
import { env } from "process";

export const prisma = new PrismaClient({
  log: env.NODE_ENV === "development" ? ["error"] : [],
});
