import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { GiftsListActions } from "@/modules/gifts/components/gifts-list-actions";
import { PrivateGiftCard } from "@/modules/gifts/components/private-gift-card";
import { Gift } from "@/modules/gifts/types";
import { getWeddingListByUserId } from "@/modules/wedding-list/actions";

const gifts: Gift[] = [
  {
    id: "1",
    name: "Panela Elétrica",
    description: "Ideal para preparar arroz e legumes a vapor.",
    price: 199.9,
    imageUrl: "https://source.unsplash.com/400x300/?kitchen,pot",
    giftedCount: 0,
  },
  {
    id: "2",
    name: "Jogo de Toalhas",
    description: "Toalhas macias para o casal.",
    price: 120.0,
    imageUrl: "https://source.unsplash.com/400x300/?towel",
    giftedCount: 1,
  },
  {
    id: "3",
    name: "Liquidificador",
    description: "Perfeito para sucos e vitaminas.",
    price: 180.0,
    imageUrl: "https://source.unsplash.com/400x300/?blender",
    giftedCount: 2,
  },
];

export default async function GiftsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  const weddingList = await getWeddingListByUserId(session.user.id);

  const theme = weddingList.theme ?? "classico";

  return (
    <section className={`theme-${theme} mb-4`} style={{ fontFamily: "var(--font-family)" }}>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-4 w-full">
        <h2 className="text-lg font-semibold break-words">Lista de Presentes</h2>
        <GiftsListActions weddingList={weddingList} />
      </div>
      <div className="flex flex-col gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
        {gifts.map((gift) => (
          <PrivateGiftCard key={gift.id} gift={gift} />
        ))}
      </div>
    </section>
  );
}
