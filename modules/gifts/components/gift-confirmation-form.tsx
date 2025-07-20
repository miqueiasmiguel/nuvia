"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ContributionFormValues, contributionSchema } from "@/modules/contributions/validations";
import { zodResolver } from "@hookform/resolvers/zod";

import { createContribution } from "../actions";
import { Gift } from "../types";

export function GiftConfirmationForm({
  gift,
  onSuccess,
  onCancel,
  theme,
}: {
  gift: Gift;
  onSuccess: () => void;
  onCancel: () => void;
  theme?: string;
}) {
  const [confirmed, setConfirmed] = useState(false);

  const form = useForm<ContributionFormValues>({
    resolver: zodResolver(contributionSchema),
    defaultValues: {
      name: "",
      phone: "",
      amount: gift.price,
      message: "",
      isPublic: true,
      giftId: gift.id,
    },
  });

  function onSubmit(data: ContributionFormValues) {
    createContribution(data);

    toast.success("Presente confirmado com sucesso");
    onSuccess?.();
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
          name="phone"
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
        <div className="flex flex-row items-center gap-2 mb-4">
          <Checkbox
            checked={confirmed}
            onCheckedChange={(checked) => setConfirmed(checked === "indeterminate" ? false : checked)}
          />
          <FormLabel className="mb-0">
            Confirmo que realizei um PIX de R$ {gift.price.toFixed(2)} referente ao presente &quot;
            {gift.name}&quot;
          </FormLabel>
        </div>
        <div className="flex flex-row gap-2 justify-between">
          <Button type="button" variant="outline" onClick={onCancel}>
            Voltar
          </Button>
          <Button type="submit" disabled={form.formState.isSubmitting || !confirmed}>
            Confirmar
          </Button>
        </div>
      </form>
    </Form>
  );
}
