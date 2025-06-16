import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { Gift } from "../types";
import { GiftForm } from "./gift-form";

export function GiftFormDialog({
  weddingListId,
  gift,
  isOpen,
  onOpenChange,
}: {
  weddingListId: string;
  gift?: Gift;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Novo Presente</DialogTitle>
        </DialogHeader>
        <GiftForm weddingListId={weddingListId} gift={gift} onSuccess={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}
