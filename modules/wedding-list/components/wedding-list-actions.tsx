"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { GiftFormDialog } from "@/modules/gifts/components/gift-form-dialog";
import { WeddingList } from "@/modules/wedding-list/types";

import { WeddingListFormDialog } from "./wedding-list-form-dialog";

export function WeddingListActions({ weddingList }: { weddingList: WeddingList }) {
  const router = useRouter();
  const [isWeddingListFormOpen, setIsWeddingListFormOpen] = useState(false);
  const [isGiftFormOpen, setIsGiftFormOpen] = useState(false);

  return (
    <div className="flex flex-row gap-2 w-full sm:w-auto">
      <Button onClick={() => router.push(`/list/${weddingList.slug}`)}>Lista Pública</Button>
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
