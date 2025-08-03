import Image from "next/image";

import { getImageUrl } from "@/lib/s3-client";
import { getPublicGiftsByWeddingListId } from "@/modules/gifts/actions";
import { PublicGiftCard } from "@/modules/gifts/components/public-gift-card";
import { getWeddingListBySlug } from "@/modules/wedding-list/actions";

export default async function ListPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const weddingList = await getWeddingListBySlug(slug);
  const theme = weddingList.theme ?? "classico";
  const gifts = await getPublicGiftsByWeddingListId(weddingList.id);

  return (
    <div
      className={`theme-${theme} max-w-3xl mx-auto py-8 px-2 flex flex-col gap-8`}
      style={{ fontFamily: "var(--font-family)" }}
    >
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary shadow">
          <Image
            src={getImageUrl(weddingList.coverImage) ?? ""}
            alt={`${weddingList.brideName} & ${weddingList.groomName}`}
            width={96}
            height={96}
            className="object-cover w-full h-full"
            priority
          />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-primary">
          {weddingList.brideName} & {weddingList.groomName}
        </h1>
        <p className="text-zinc-600 dark:text-zinc-300 max-w-md">{weddingList.message}</p>
      </div>

      <div className="flex flex-col gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
        {gifts.map((gift) => (
          <div key={gift.id}>
            <PublicGiftCard gift={gift} theme={theme} />
          </div>
        ))}
      </div>
    </div>
  );
}
