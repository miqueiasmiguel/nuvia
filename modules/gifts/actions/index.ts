"use server";

import { GiftsService } from "../services/gifts.services";
import { Gift } from "../types";
import { GiftFormValues } from "../validations";

export async function getGiftsByWeddingListId(weddingListId: string): Promise<Gift[]> {
  return await GiftsService.getGiftsByWeddingListId(weddingListId);
}

export async function createGift(data: GiftFormValues, weddingListId: string): Promise<void> {
  await GiftsService.createGift(data, weddingListId);
}

export async function updateGift(id: string, data: GiftFormValues): Promise<void> {
  await GiftsService.updateGift(id, data);
}
