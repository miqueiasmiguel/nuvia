"use client";

import { Pencil } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

import { changeGiftVisibility } from "../actions";
import { Gift } from "../types";
import { GiftFormDialog } from "./gift-form-dialog";

export function PrivateGiftCard({ gift }: { gift: Gift }) {
  const [isGiftFormOpen, setIsGiftFormOpen] = useState(false);
  const [isPublic, setIsPublic] = useState(gift.isPublic);

  async function handleToggleVisibility() {
    const newState = await changeGiftVisibility(gift.id, !isPublic);
    setIsPublic(newState);
    toast.success(`O presente ${gift.name} agora está ${newState ? "público" : "privado"}`);
  }

  return (
    <Card key={gift.id} className="flex flex-row items-center p-2 sm:p-0 sm:flex-col sm:h-full min-h-[84px]">
      {gift.image && (
        <div className="w-20 h-20 rounded-md overflow-hidden bg-zinc-100 flex-shrink-0 sm:w-full sm:h-40 sm:rounded-t-md sm:rounded-b-none">
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
          <div className="flex gap-1 sm:gap-2 items-center">
            <span className="text-xs sm:text-sm text-zinc-500">{isPublic ? "Público" : "Privado"}</span>
            <Switch checked={isPublic} onCheckedChange={handleToggleVisibility} aria-label="Visibilidade" />
            <Button
              size="icon"
              variant="outline"
              aria-label="Editar"
              className="w-7 h-7 sm:w-8 sm:h-8"
              onClick={() => setIsGiftFormOpen(true)}
            >
              <Pencil className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
      <GiftFormDialog
        weddingListId={gift.weddingListId}
        gift={gift}
        isOpen={isGiftFormOpen}
        onOpenChange={setIsGiftFormOpen}
      />
    </Card>
  );
}
