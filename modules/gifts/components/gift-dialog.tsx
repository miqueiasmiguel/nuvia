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
  theme,
}: {
  giftDialogOpen: boolean;
  setGiftDialogOpen: (open: boolean) => void;
  pixConfirmed: boolean;
  setPixConfirmed: (confirmed: boolean) => void;
  gift: Gift;
  theme?: string;
}) {
  return (
    <Dialog open={giftDialogOpen} onOpenChange={setGiftDialogOpen}>
      <DialogContent
        className={theme ? `theme-${theme}` : undefined}
        style={theme ? { fontFamily: "var(--font-family)" } : undefined}
      >
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
            theme={theme}
          />
        ) : (
          <GiftConfirmation gift={gift} onConfirmPix={() => setPixConfirmed(true)} theme={theme} />
        )}
      </DialogContent>
    </Dialog>
  );
}
