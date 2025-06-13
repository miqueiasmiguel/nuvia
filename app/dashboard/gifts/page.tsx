import { GiftFormDialog } from "@/modules/gifts/components/gift-form-dialog";
import { PrivateGiftCard } from "@/modules/gifts/components/private-gift-card";
import { Gift, GiftStatus } from "@/modules/gifts/types";
import { WeddingListFormDialog } from "@/modules/wedding-list/components/wedding-list-form-dialog";

const gifts: Gift[] = [
  {
    id: "1",
    name: "Panela Elétrica",
    description: "Ideal para preparar arroz e legumes a vapor.",
    price: 199.9,
    status: GiftStatus.AVAILABLE,
    imageUrl: "https://source.unsplash.com/400x300/?kitchen,pot",
    giftedCount: 0,
  },
  {
    id: "2",
    name: "Jogo de Toalhas",
    description: "Toalhas macias para o casal.",
    price: 120.0,
    status: GiftStatus.AVAILABLE,
    imageUrl: "https://source.unsplash.com/400x300/?towel",
    giftedCount: 1,
  },
  {
    id: "3",
    name: "Liquidificador",
    description: "Perfeito para sucos e vitaminas.",
    price: 180.0,
    status: GiftStatus.AVAILABLE,
    imageUrl: "https://source.unsplash.com/400x300/?blender",
    giftedCount: 2,
  },
];

export default function GiftsPage() {
  return (
    <section className="mb-4">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Lista de Presentes</h2>
        <div className="flex flex-col sm:flex-row gap-2">
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
