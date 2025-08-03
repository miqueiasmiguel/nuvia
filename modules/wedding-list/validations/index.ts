import z from "zod";

import { PixType } from "../types";

export const weddingSettingsSchema = z.object({
  brideName: z.string(),
  groomName: z.string(),
  weddingDate: z.string().optional(),
  pixKey: z.string(),
  pixType: z.nativeEnum(PixType),
  coverImage: z
    .union([
      z.string(),
      z.instanceof(File).refine((file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type), {
        message: "Arquivo de imagem inválido",
      }),
    ])
    .optional(),
  message: z.string().optional(),
  theme: z.string(),
});

export type WeddingSettingsFormValues = z.infer<typeof weddingSettingsSchema>;

// Função utilitária para converter DataURL para File
export async function dataURLToFile(dataURL: string, filename: string = "image.png"): Promise<File> {
  const response = await fetch(dataURL);
  const blob = await response.blob();
  return new File([blob], filename, { type: "image/png" });
}
