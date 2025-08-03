import z from "zod";

export const giftSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  image: z
    .union([
      z.string(),
      z.instanceof(File).refine((file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type), {
        message: "Arquivo de imagem inválido",
      }),
    ])
    .optional(),
});

export type GiftFormValues = z.infer<typeof giftSchema>;

// Função utilitária para converter DataURL para File
export async function dataURLToFile(dataURL: string, filename: string = "image.jpg"): Promise<File> {
  const response = await fetch(dataURL);
  const blob = await response.blob();
  return new File([blob], filename, { type: "image/jpeg" });
}
