"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";

import { PixType } from "../types";

export const weddingListSchema = z.object({
  brideName: z.string(),
  groomName: z.string(),
  weddingDate: z.string().optional(),
  pixKey: z.string(),
  pixType: z.nativeEnum(PixType),
  coverImage: z.string().url("URL da imagem inválida").optional(),
  message: z.string().optional(),
  theme: z.string(),
  slug: z.string(),
});

type GiftFormValues = z.infer<typeof weddingListSchema>;

export function WeddingListFormDialog() {
  const form = useForm<GiftFormValues>({
    resolver: zodResolver(weddingListSchema),
    defaultValues: {
      slug: "",
      brideName: "",
      groomName: "",
      weddingDate: undefined,
      message: "",
      coverImage: "",
      pixKey: "",
      pixType: undefined,
      theme: undefined,
    },
  });

  function onSubmit(data: GiftFormValues) {
    // TODO: ação de submit
    // Exemplo: criarPresente(data)
    // form.reset();
    // fechar modal se necessário
    alert(JSON.stringify(data, null, 2));
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Configurar</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Configurar Lista de Presentes</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="brideName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da noiva</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome da noiva" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="groomName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do noivo</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do noivo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="weddingDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data do casamento</FormLabel>
                  <FormControl>
                    <Input type="date" placeholder="Data do casamento" {...field} />
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
                  <FormLabel>Mensagem</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Mensagem" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="coverImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Imagem de capa</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/image.jpg" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="theme"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tema</FormLabel>
                  <FormControl>
                    <Select {...field}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um tema" />
                      </SelectTrigger>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pixKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chave PIX</FormLabel>
                  <FormControl>
                    <Input placeholder="00000000000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pixType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo da chave PIX</FormLabel>
                  <FormControl>
                    <Select {...field}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um tipo" />
                      </SelectTrigger>
                    </Select>
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
      </DialogContent>
    </Dialog>
  );
}
