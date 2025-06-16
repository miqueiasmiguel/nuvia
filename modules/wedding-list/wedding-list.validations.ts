import z from "zod";

import { PixType } from "./types";

export const weddingSettingsSchema = z.object({
  brideName: z.string(),
  groomName: z.string(),
  weddingDate: z.string().optional(),
  pixKey: z.string(),
  pixType: z.nativeEnum(PixType),
  coverImage: z.string().url("URL da imagem inválida").optional(),
  message: z.string().optional(),
  theme: z.string(),
});

export type WeddingSettingsFormValues = z.infer<typeof weddingSettingsSchema>;
