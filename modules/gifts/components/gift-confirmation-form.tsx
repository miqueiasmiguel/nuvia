"use client";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";

const confirmationSchema = z.object({
  name: z.string().min(1, "Informe seu nome"),
  email: z.string().email("E-mail inválido").optional().or(z.literal("")),
  whatsapp: z.string().optional(),
  message: z.string().optional(),
  isPublic: z.boolean().optional(),
  proof: z.any().optional(),
  confirmPix: z.boolean(),
});

type ConfirmationFormValues = z.infer<typeof confirmationSchema>;

export function GiftConfirmationForm({
  pixValue,
  giftName,
  onSuccess,
  onCancel,
  theme,
}: {
  pixValue: number;
  giftName: string;
  onSuccess: () => void;
  onCancel: () => void;
  theme?: string;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const form = useForm<ConfirmationFormValues>({
    resolver: zodResolver(confirmationSchema),
    defaultValues: {
      name: "",
      email: "",
      whatsapp: "",
      message: "",
      isPublic: false,
      proof: undefined,
      confirmPix: false,
    },
  });

  function onSubmit(data: ConfirmationFormValues) {
    onSuccess();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`space-y-4${theme ? ` theme-${theme}` : ""}`}
        style={theme ? { fontFamily: "var(--font-family)" } : undefined}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Seu nome</FormLabel>
              <FormControl>
                <Input placeholder="Nome completo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input placeholder="email@exemplo.com" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="whatsapp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Whatsapp</FormLabel>
              <FormControl>
                <Input placeholder="(99) 99999-9999" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mensagem para os noivos</FormLabel>
              <FormControl>
                <Textarea placeholder="Sua mensagem" {...field} rows={4} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isPublic"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center gap-2">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel className="mb-0">Mensagem pública?</FormLabel>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="proof"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comprovante</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*,application/pdf"
                  ref={fileInputRef}
                  onChange={(e) => field.onChange(e.target.files?.[0])}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPix"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center gap-2">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel className="mb-0">
                Confirmo que realizei um PIX de R$ {pixValue.toFixed(2)} referente ao presente &quot;
                {giftName}&quot;
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row gap-2 justify-between">
          <Button type="button" variant="outline" onClick={onCancel}>
            Voltar
          </Button>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            Confirmar
          </Button>
        </div>
      </form>
    </Form>
  );
}
