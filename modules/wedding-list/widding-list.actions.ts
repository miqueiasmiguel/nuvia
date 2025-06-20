"use server";

import { headers } from "next/headers";

import { auth } from "@/lib/auth";

import { WeddingListService } from "./wedding-list.service";
import { WeddingSettingsFormValues } from "./wedding-list.validations";

export async function getWeddingListByUserId(userId: string) {
  return await WeddingListService.getWeddingListByUserId(userId);
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
