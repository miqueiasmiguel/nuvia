"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";

import { PixType, WeddingList } from "../types";
import { WeddingSettingsFormValues, weddingSettingsSchema } from "../wedding-list.validations";
import { createWeddingList, updateWeddingList } from "../widding-list.actions";
import { CircleImagePicker } from "./circle-image-picker";

export function WeddingSettingsForm({ weddingList }: { weddingList?: WeddingList }) {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const router = useRouter();
  const form = useForm<WeddingSettingsFormValues>({
    resolver: zodResolver(weddingSettingsSchema),
    defaultValues: {
      brideName: weddingList?.brideName ?? "",
      groomName: weddingList?.groomName ?? "",
      weddingDate: weddingList?.weddingDate?.toISOString().split("T")[0] ?? "",
      message: weddingList?.message ?? "",
      coverImage: weddingList?.coverImage ?? "",
      pixKey: weddingList?.pixKey ?? "",
      pixType: weddingList?.pixType ?? undefined,
      theme: weddingList?.theme ?? undefined,
    },
  });

  async function onSubmit(data: WeddingSettingsFormValues) {
    if (weddingList) {
      await updateWeddingList(weddingList.id, data);
    } else {
      await createWeddingList(data);
    }

    if (callbackUrl) {
      router.push(callbackUrl);
    } else {
      router.push("/dashboard/gifts");
    }

    toast.success("Lista de presentes salva com sucesso");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {callbackUrl && (
          <Alert variant="default">
            <AlertTitle>Antes de continuar, você precisa configurar a lista de presentes</AlertTitle>
            <AlertDescription>Você precisa configurar a lista de presentes para continuar.</AlertDescription>
          </Alert>
        )}
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
                <CircleImagePicker value={field.value} onChange={field.onChange} />
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
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um tema" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="classico">Clássico</SelectItem>
                    <SelectItem value="moderno">Moderno</SelectItem>
                    <SelectItem value="floral">Floral</SelectItem>
                  </SelectContent>
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
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={PixType.CPF}>CPF</SelectItem>
                    <SelectItem value={PixType.CNPJ}>CNPJ</SelectItem>
                    <SelectItem value={PixType.EMAIL}>E-mail</SelectItem>
                    <SelectItem value={PixType.PHONE}>Telefone</SelectItem>
                    <SelectItem value={PixType.RANDOM_KEY}>Chave Aleatória</SelectItem>
                  </SelectContent>
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
  );
}
