import { GiftFormDialog } from "@/modules/gifts/components/gift-form-dialog";
import { PrivateGiftCard } from "@/modules/gifts/components/private-gift-card";
import { Gift } from "@/modules/gifts/types";
import { WeddingListFormDialog } from "@/modules/wedding-list/components/wedding-settings-form-dialog";

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

const theme = "classico";

export default function GiftsPage() {
  return (
    <section className={`theme-${theme} mb-4`} style={{ fontFamily: "var(--font-family)" }}>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-4 w-full">
        <h2 className="text-lg font-semibold break-words">Lista de Presentes</h2>
        <div className="flex flex-row gap-2 w-full justify-end sm:w-auto">
          <WeddingListFormDialog />
          <GiftFormDialog />
        </div>
      </div>
      <div className="flex flex-col gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
        {gifts.map((gift) => (
          <PrivateGiftCard key={gift.id} gift={gift} />
        ))}
      </div>
    </section>
  );
}
