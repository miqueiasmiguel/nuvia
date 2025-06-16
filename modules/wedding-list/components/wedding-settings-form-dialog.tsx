"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import { WeddingSettingsForm } from "./wedding-settings-form";

export function WeddingListFormDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Configurar</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Configurar Lista de Presentes</DialogTitle>
        </DialogHeader>
        <WeddingSettingsForm />
      </DialogContent>
    </Dialog>
  );
}
