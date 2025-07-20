import { headers } from "next/headers";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { auth } from "@/lib/auth";
import { getContributionsByWeddingListId } from "@/modules/contributions/actions";
import { ContributionCard } from "@/modules/contributions/components/contribution-card";
import { getWeddingListById } from "@/modules/wedding-list/actions";

export default async function ContributionsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  const weddingList = await getWeddingListById(session.user.weddingListId ?? "");
  const contributions = await getContributionsByWeddingListId(weddingList.id);
  const theme = weddingList.theme ?? "classico";

  return (
    <section className={`theme-${theme} mb-4`} style={{ fontFamily: "var(--font-family)" }}>
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold">Contribuições</h2>
        <Select>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filtrar" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="30dias">Últimos 30 dias</SelectItem>
            <SelectItem value="mes">Este mês</SelectItem>
            <SelectItem value="todos">Todos</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        {contributions.map((contribution) => (
          <ContributionCard key={contribution.id} contribution={contribution} />
        ))}
      </div>
    </section>
  );
}
