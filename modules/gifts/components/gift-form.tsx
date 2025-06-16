"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SquareImagePicker } from "@/modules/gifts/components/square-image-picker";
import { zodResolver } from "@hookform/resolvers/zod";

import { createGift, updateGift } from "../actions";
import { Gift } from "../types";
import { GiftFormValues, giftSchema } from "../validations";

interface GiftFormProps {
  weddingListId: string;
  gift?: Gift;
  onSuccess?: () => void;
}

export function GiftForm({ weddingListId, gift, onSuccess }: GiftFormProps) {
  const router = useRouter();
  const form = useForm<GiftFormValues>({
    resolver: zodResolver(giftSchema),
    defaultValues: {
      name: gift?.name ?? "",
      description: gift?.description ?? "",
      price: gift?.price ?? 0,
      image: gift?.image ?? "",
    },
  });

  function onSubmit(data: GiftFormValues) {
    if (gift) {
      updateGift(gift.id, data);
    } else {
      createGift(data, weddingListId);
    }

    router.refresh();

    toast.success("Presente salvo com sucesso");
    onSuccess?.();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Nome do presente" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Input placeholder="Descrição do presente" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Valor sugerido</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="R$ 0,00"
                  {...field}
                  onChange={(e) => field.onChange(e.target.value === "" ? undefined : Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Imagem do presente</FormLabel>
              <FormControl>
                <SquareImagePicker value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          Salvar
        </Button>
      </form>
    </Form>
  );
}
