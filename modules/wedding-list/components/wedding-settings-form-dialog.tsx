"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import { WeddingList } from "../types";
import { WeddingSettingsForm } from "./wedding-settings-form";

export function WeddingListFormDialog({ weddingList }: { weddingList?: WeddingList }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Configurar</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Configurar Lista de Presentes</DialogTitle>
        </DialogHeader>
        <WeddingSettingsForm weddingList={weddingList} />
      </DialogContent>
    </Dialog>
  );
}
