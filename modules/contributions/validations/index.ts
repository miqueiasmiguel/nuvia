import z from "zod";

export const contributionSchema = z.object({
  name: z.string().min(1, "Informe seu nome"),
  phone: z.string().optional(),
  amount: z.number(),
  message: z.string().optional(),
  isPublic: z.boolean(),
  giftId: z.string(),
});

export type ContributionFormValues = z.infer<typeof contributionSchema>;
