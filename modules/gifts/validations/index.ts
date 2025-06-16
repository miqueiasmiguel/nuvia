import z from "zod";

export const giftSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  image: z.string(),
});

export type GiftFormValues = z.infer<typeof giftSchema>;
