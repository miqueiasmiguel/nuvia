"use server";

import { headers } from "next/headers";

import { auth } from "@/lib/auth";

import { WeddingListService } from "../services/wedding-list.service";
import { WeddingSettingsFormValues } from "../validations";

export async function getWeddingListById(id: string) {
  return await WeddingListService.getWeddingListById(id);
}

export async function getWeddingListBySlug(slug: string) {
  return await WeddingListService.getWeddingListBySlug(slug);
}

export async function createWeddingList(data: WeddingSettingsFormValues) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  const weddingList = await WeddingListService.createWeddingList(data, session.user.id);

  return weddingList;
}

export async function updateWeddingList(id: string, data: WeddingSettingsFormValues) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  const weddingList = await WeddingListService.updateWeddingList(id, data);

  return weddingList;
}
