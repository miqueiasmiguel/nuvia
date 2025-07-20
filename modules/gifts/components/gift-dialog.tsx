"use client";

import { useEffect, useState } from "react";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getWeddingListById } from "@/modules/wedding-list/actions";

import { Gift } from "../types";
import { generatePixDynamicPayload } from "../utils";
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
  const [pixCode, setPixCode] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchWeddingList = async () => {
      const weddingList = await getWeddingListById(gift.weddingListId);
      setPixCode(
        generatePixDynamicPayload({
          key: weddingList?.pixKey || "",
          giftName: gift.name,
          beneficiaryName: weddingList?.brideName || "",
          beneficiaryCity: "SAO PAULO",
          value: gift.price,
        }),
      );
    };
    fetchWeddingList();
  }, [gift.weddingListId, gift.name, gift.price]);

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
            gift={gift}
            onSuccess={() => {
              setGiftDialogOpen(false);
            }}
            onCancel={() => {
              setPixConfirmed(false);
            }}
            theme={theme}
          />
        ) : (
          <GiftConfirmation gift={gift} pixCode={pixCode} onConfirmPix={() => setPixConfirmed(true)} theme={theme} />
        )}
      </DialogContent>
    </Dialog>
  );
}
