import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { WeddingList } from "../types";
import { WeddingSettingsForm } from "./wedding-settings-form";

export function WeddingListFormDialog({
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Configurar Lista de Presentes</DialogTitle>
        </DialogHeader>
        <WeddingSettingsForm weddingList={weddingList} onSuccess={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}
