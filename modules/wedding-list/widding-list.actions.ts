"use server";

import { headers } from "next/headers";

import { auth } from "@/lib/auth";

import { WeddingListService } from "./wedding-list.service";
import { WeddingSettingsFormValues } from "./wedding-list.validations";

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
