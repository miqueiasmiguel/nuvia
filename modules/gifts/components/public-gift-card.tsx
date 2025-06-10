import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { Gift } from "../types";

export function PublicGiftCard({ gift }: { gift: Gift }) {
  return (
    <Card key={gift.id} className="flex flex-row items-center p-2 sm:p-0 sm:flex-col sm:h-full min-h-[84px]">
      <div className="w-30 h-30 rounded-md overflow-hidden bg-zinc-100 flex-shrink-0 sm:w-full sm:h-40 sm:rounded-t-md sm:rounded-b-none">
        <Image
          src={gift.imageUrl ?? ""}
          alt={gift.name}
          width={80}
          height={80}
          className="object-cover w-full h-full"
        />
      </div>
      <CardContent className="flex flex-1 flex-col justify-between p-2 sm:p-4 gap-1 sm:gap-2 sm:flex-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-semibold text-sm sm:text-base truncate" title={gift.name}>
            {gift.name}
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-zinc-500 line-clamp-2">{gift.description}</p>
        <div className="flex items-center justify-between pt-1 sm:pt-2">
          <span className="font-bold text-primary text-base sm:text-lg">R$ {gift.price.toFixed(2)}</span>
        </div>
        <div className="flex gap-1 sm:gap-2">
          <Button size="sm" variant="outline" aria-label="Presentear" className="w-full">
            Presentear
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
