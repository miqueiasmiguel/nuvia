"use client";

import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { Gift } from "../types";
import { CommentsDialog } from "./comments-dialog";
import { GiftDialog } from "./gift-dialog";

export function PublicGiftCard({ gift, theme }: { gift: Gift; theme: string }) {
  const [pixConfirmed, setPixConfirmed] = useState(false);
  const [giftDialogOpen, setGiftDialogOpen] = useState(false);
  const [commentsDialogOpen, setCommentsDialogOpen] = useState(false);

  return (
    <Card key={gift.id} className="flex flex-row items-center p-2 sm:p-0 sm:flex-col sm:h-full min-h-[84px]">
      {gift.image && (
        <div className="w-30 h-30 rounded-md overflow-hidden bg-zinc-100 flex-shrink-0 sm:w-full sm:h-40 sm:rounded-t-md sm:rounded-b-none">
          <Image src={gift.image} alt={gift.name} width={80} height={80} className="object-cover w-full h-full" />
        </div>
      )}
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
        <span className="text-xs text-zinc-500 mt-1">
          {gift.giftedCount > 0
            ? `${gift.giftedCount} pessoa${gift.giftedCount > 1 ? "s" : ""} já presentearam`
            : "Seja o primeiro a presentear"}
        </span>
        {gift.giftedCount > 1 && (
          <Button
            size="sm"
            variant="ghost"
            className="text-xs px-2 py-1 mt-1"
            onClick={() => setCommentsDialogOpen(true)}
          >
            Visualizar comentários
          </Button>
        )}
        <div className="flex gap-1 sm:gap-2">
          <Button
            size="sm"
            variant="outline"
            aria-label="Presentear"
            className="w-full"
            onClick={() => setGiftDialogOpen(true)}
          >
            Presentear
          </Button>
        </div>
      </CardContent>
      <CommentsDialog commentsDialogOpen={commentsDialogOpen} setCommentsDialogOpen={setCommentsDialogOpen} />
      <GiftDialog
        giftDialogOpen={giftDialogOpen}
        setGiftDialogOpen={setGiftDialogOpen}
        pixConfirmed={pixConfirmed}
        setPixConfirmed={setPixConfirmed}
        gift={gift}
        theme={theme}
      />
    </Card>
  );
}
