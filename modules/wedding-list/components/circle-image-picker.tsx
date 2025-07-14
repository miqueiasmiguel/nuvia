"use client";
import { useRef, useState } from "react";
import Cropper from "react-easy-crop";

import { Button } from "@/components/ui/button";

type CroppedAreaPixels = { width: number; height: number; x: number; y: number };

type Props = {
  value?: string;
  onChange: (cropped: string) => void;
};

export function CircleImagePicker({ value, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | null>(value ?? null);
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [cropping, setCropping] = useState(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedAreaPixels | null>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setImage(ev.target?.result as string);
      setCropping(true);
    };
    reader.readAsDataURL(file);
  }

  function onCropComplete(_croppedArea: { x: number; y: number }, croppedAreaPixels: CroppedAreaPixels) {
    setCroppedAreaPixels(croppedAreaPixels);
  }

  async function getCroppedImg() {
    if (!image || !croppedAreaPixels) return;
    const createImage = (url: string) =>
      new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new window.Image();
        img.addEventListener("load", () => resolve(img));
        img.addEventListener("error", (error) => reject(error));
        img.setAttribute("crossOrigin", "anonymous");
        img.src = url;
      });

    const imageEl = await createImage(image);
    const size = Math.max(croppedAreaPixels.width, croppedAreaPixels.height);
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, size, size);
    ctx.save();
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.clip();

    ctx.drawImage(
      imageEl,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      size,
      size,
    );
    ctx.restore();

    return canvas.toDataURL("image/png");
  }

  async function handleCropComplete() {
    const cropped = await getCroppedImg();
    setCropping(false);
    if (cropped) onChange(cropped);
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
        onClick={(e) => e.stopPropagation()}
      />
      <div
        className="w-24 h-24 rounded-full bg-zinc-100 overflow-hidden flex items-center justify-center cursor-pointer border relative"
        onClick={(e) => {
          e.preventDefault();
          inputRef.current?.click();
        }}
        onKeyDown={(e) => e.preventDefault()}
        tabIndex={0}
        role="button"
        aria-label="Selecionar imagem"
      >
        {value ? (
          <img src={value} alt="Imagem selecionada" className="w-full h-full object-cover" />
        ) : (
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs text-zinc-400">
            Selecionar imagem
          </span>
        )}
      </div>
      {cropping && image && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
          <div className="bg-white rounded-lg p-4 flex flex-col items-center gap-4">
            <div className="relative w-64 h-64">
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
            <div className="flex flex-col items-center gap-2 mt-4 w-64">
              <label className="text-xs text-zinc-500 mb-1">Zoom</label>
              <input
                type="range"
                min={1}
                max={3}
                step={0.01}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <div className="flex gap-2">
              <Button type="button" onClick={handleCropComplete}>
                Cortar
              </Button>
              <Button type="button" variant="outline" onClick={() => setCropping(false)}>
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
