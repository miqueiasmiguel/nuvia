"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { GiftFormDialog } from "@/modules/gifts/components/gift-form-dialog";
import { WeddingList } from "@/modules/wedding-list/types";

import { WeddingListFormDialog } from "./wedding-list-form-dialog";

export function WeddingListActions({ weddingList }: { weddingList: WeddingList }) {
  const [isWeddingListFormOpen, setIsWeddingListFormOpen] = useState(false);
  const [isGiftFormOpen, setIsGiftFormOpen] = useState(false);

  return (
    <div className="flex flex-row gap-2 w-full justify-end sm:w-auto">
      <Button onClick={() => setIsWeddingListFormOpen(true)}>Configurar</Button>
      <Button onClick={() => setIsGiftFormOpen(true)}>Adicionar Presente</Button>
      <WeddingListFormDialog
        weddingList={weddingList}
        isOpen={isWeddingListFormOpen}
        onOpenChange={setIsWeddingListFormOpen}
      />
      <GiftFormDialog weddingListId={weddingList.id} isOpen={isGiftFormOpen} onOpenChange={setIsGiftFormOpen} />
    </div>
  );
}
