import { authOptions } from "@/app/api/infra/database/lib/auth-options";
import { getServerSession } from "next-auth";

export async function ensureAuthenticated(): Promise<string> {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    throw new Error("Usuário não autenticado.");
  }

  return session.user.id;
}
