"use client";

import { Check, Copy } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import { PixQRCode } from "./pix-qrcode";

export function GiftConfirmation({
  gift,
  pixCode = "00020126360014BR.GOV.BCB.PIX0114+551199999999520400005303986540419.905802BR5920Ana e João6009Sao Paulo62070503***6304B14F",
  onCopyPix,
  onConfirmPix,
  theme,
}: {
  gift: { name: string; price: number; imageUrl?: string };
  pixCode?: string;
  onCopyPix?: () => void;
  onConfirmPix?: () => void;
  theme?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(pixCode);
    setCopied(true);
    if (onCopyPix) onCopyPix();
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div
      className={`flex flex-col items-center gap-4 py-2${theme ? ` theme-${theme}` : ""}`}
      style={theme ? { fontFamily: "var(--font-family)" } : undefined}
    >
      <div className="flex flex-col items-center gap-2">
        {gift.imageUrl && (
          <Image
            src={gift.imageUrl}
            alt={gift.name}
            width={80}
            height={80}
            className="rounded-md object-cover w-20 h-20 border"
          />
        )}
        <h3 className="font-semibold text-lg text-center">{gift.name}</h3>
        <span className="font-bold text-primary text-xl">R$ {gift.price.toFixed(2)}</span>
      </div>
      <PixQRCode />
      <div className="w-full flex flex-col gap-2">
        <Button size="sm" variant="outline" className="w-full" onClick={handleCopy}>
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-1 text-green-600" />
              Copiado!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-1" />
              Copiar código PIX
            </>
          )}
        </Button>
        <Button className="w-full" onClick={onConfirmPix}>
          Já fiz o pix
        </Button>
      </div>
    </div>
  );
}
