"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { generateQRCode } from "../utils";

export function PixQRCode({ pixCode }: { pixCode: string }) {
  const [qrCode, setQrCode] = useState<string | undefined>(undefined);

  useEffect(() => {
    const generate = async () => {
      const qr = await generateQRCode(pixCode);
      setQrCode(qr);
    };

    generate();
  }, [pixCode]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="bg-white p-2 rounded shadow border w-40 h-40 flex items-center justify-center">
        {qrCode && <Image src={qrCode} alt="QR Code PIX" width={160} height={160} />}
      </div>
      <span className="text-xs text-zinc-500">Escaneie para pagar</span>
    </div>
  );
}
