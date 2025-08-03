import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { getGiftsByWeddingListId } from "@/modules/gifts/actions";
import { PrivateGiftCard } from "@/modules/gifts/components/private-gift-card";
import { getWeddingListById } from "@/modules/wedding-list/actions";
import { WeddingListActions } from "@/modules/wedding-list/components/wedding-list-actions";

export default async function GiftsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  const weddingList = await getWeddingListById(session.user.weddingListId ?? "");
  const gifts = await getGiftsByWeddingListId(weddingList.id);
  const theme = weddingList.theme ?? "classico";

  return (
    <section
      className={`theme-${theme} max-w-3xl mx-auto py-8 px-2 flex flex-col gap-8`}
      style={{ fontFamily: "var(--font-family)" }}
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-4 w-full">
        <h2 className="text-lg font-semibold break-words">Lista de Presentes</h2>
        <WeddingListActions weddingList={weddingList} />
      </div>
      <div className="flex flex-col gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
        {gifts.map((gift) => (
          <PrivateGiftCard key={gift.id} gift={gift} />
        ))}
      </div>
    </section>
  );
}
