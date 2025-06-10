export function PixQRCode() {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="bg-white p-2 rounded shadow border w-40 h-40 flex items-center justify-center">
        <span className="text-xs text-zinc-400">[QR Code PIX]</span>
      </div>
      <span className="text-xs text-zinc-500">Escaneie para pagar</span>
    </div>
  );
}
