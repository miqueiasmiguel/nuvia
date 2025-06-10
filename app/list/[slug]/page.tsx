import Image from "next/image";

import { GiftCard } from "@/modules/gifts/components/gift-card";
import { Gift, GiftStatus } from "@/modules/gifts/types";

// Mock de dados do casal e presentes
const couple = {
  name: "Ana & João",
  imageUrl: "https://source.unsplash.com/200x200/?couple,wedding",
  message: "Seja bem-vindo à nossa lista de presentes! Obrigado por fazer parte desse momento especial.",
};

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

export default async function ListPage() {
  return (
    <div className="max-w-3xl mx-auto py-8 px-2 flex flex-col gap-8">
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary shadow">
          <Image
            src={couple.imageUrl}
            alt={couple.name}
            width={96}
            height={96}
            className="object-cover w-full h-full"
            priority
          />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-primary">{couple.name}</h1>
        <p className="text-zinc-600 dark:text-zinc-300 max-w-md">{couple.message}</p>
      </div>

      <div className="flex flex-col gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
        {gifts.map((gift) => (
          <GiftCard key={gift.id} gift={gift} />
        ))}
      </div>
    </div>
  );
}
