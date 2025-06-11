import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { Gift } from "../types";
import { GiftConfirmation } from "./gift-confirmation";
import { GiftConfirmationForm } from "./gift-confirmation-form";

export function GiftDialog({
  giftDialogOpen,
  setGiftDialogOpen,
  pixConfirmed,
  setPixConfirmed,
  gift,
}: {
  giftDialogOpen: boolean;
  setGiftDialogOpen: (open: boolean) => void;
  pixConfirmed: boolean;
  setPixConfirmed: (confirmed: boolean) => void;
  gift: Gift;
}) {
  return (
    <Dialog open={giftDialogOpen} onOpenChange={setGiftDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Presentear</DialogTitle>
        </DialogHeader>
        {pixConfirmed ? (
          <GiftConfirmationForm
            pixValue={gift.price}
            giftName={gift.name}
            onSuccess={() => {
              setGiftDialogOpen(false);
            }}
            onCancel={() => {
              setPixConfirmed(false);
            }}
          />
        ) : (
          <GiftConfirmation gift={gift} onConfirmPix={() => setPixConfirmed(true)} />
        )}
      </DialogContent>
    </Dialog>
  );
}
