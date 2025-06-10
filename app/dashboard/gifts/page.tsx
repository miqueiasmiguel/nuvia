import { GiftForm } from "@/modules/gifts/components/gift-form";
import { PrivateGiftCard } from "@/modules/gifts/components/private-gift-card";
import { Gift, GiftStatus } from "@/modules/gifts/types";

const gifts: Gift[] = [
  {
    id: "1",
    name: "Panela Elétrica",
    description: "Ideal para preparar arroz e legumes a vapor.",
    price: 199.9,
    status: GiftStatus.AVAILABLE,
    imageUrl: "https://source.unsplash.com/400x300/?kitchen,pot",
  },
  {
    id: "2",
    name: "Jogo de Toalhas",
    description: "Toalhas macias para o casal.",
    price: 120.0,
    status: GiftStatus.AVAILABLE,
    imageUrl: "https://source.unsplash.com/400x300/?towel",
  },
  {
    id: "3",
    name: "Liquidificador",
    description: "Perfeito para sucos e vitaminas.",
    price: 180.0,
    status: GiftStatus.AVAILABLE,
    imageUrl: "https://source.unsplash.com/400x300/?blender",
  },
];

export default function GiftsPage() {
  return (
    <section className="mb-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Presentes</h2>
        <GiftForm />
      </div>
      <div className="flex flex-col gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
        {gifts.map((gift) => (
          <PrivateGiftCard key={gift.id} gift={gift} />
        ))}
      </div>
    </section>
  );
}
