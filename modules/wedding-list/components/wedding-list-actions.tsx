"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { WeddingSettingsForm } from "@/modules/wedding-list/components/wedding-settings-form";
import { WeddingList } from "@/modules/wedding-list/types";

import { GiftForm } from "../../gifts/components/gift-form";

export function WeddingListActions({ weddingList }: { weddingList: WeddingList }) {
  const [isWeddingListFormOpen, setIsWeddingListFormOpen] = useState(false);
  const [isGiftFormOpen, setIsGiftFormOpen] = useState(false);

  return (
    <div className="flex flex-row gap-2 w-full justify-end sm:w-auto">
      <WeddingListFormDialog
        weddingList={weddingList}
        isOpen={isWeddingListFormOpen}
        onOpenChange={setIsWeddingListFormOpen}
      />
      <GiftFormDialog weddingListId={weddingList.id} isOpen={isGiftFormOpen} onOpenChange={setIsGiftFormOpen} />
    </div>
  );
}

function WeddingListFormDialog({
  weddingList,
  isOpen,
  onOpenChange,
}: {
  weddingList?: WeddingList;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>Configurar</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Configurar Lista de Presentes</DialogTitle>
        </DialogHeader>
        <WeddingSettingsForm weddingList={weddingList} onSuccess={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}

export function GiftFormDialog({
  weddingListId,
  isOpen,
  onOpenChange,
}: {
  weddingListId: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>Adicionar Presente</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Novo Presente</DialogTitle>
        </DialogHeader>
        <GiftForm weddingListId={weddingListId} onSuccess={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}
