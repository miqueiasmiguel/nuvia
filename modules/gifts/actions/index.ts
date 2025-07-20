"use server";

import { ContributionsService } from "@/modules/contributions/services/contributions.service";
import { ContributionFormValues } from "@/modules/contributions/validations";

import { GiftsService } from "../services/gifts.services";
import { Gift } from "../types";
import { GiftFormValues } from "../validations";

export async function getGiftsByWeddingListId(weddingListId: string): Promise<Gift[]> {
  return await GiftsService.getGiftsByWeddingListId(weddingListId);
}

export async function getPublicGiftsByWeddingListId(weddingListId: string): Promise<Gift[]> {
  return await GiftsService.getPublicGiftsByWeddingListId(weddingListId);
}

export async function createGift(data: GiftFormValues, weddingListId: string): Promise<void> {
  await GiftsService.createGift(data, weddingListId);
}

export async function updateGift(id: string, data: GiftFormValues): Promise<void> {
  await GiftsService.updateGift(id, data);
}

export async function changeGiftVisibility(id: string, isPublic: boolean): Promise<boolean> {
  return await GiftsService.changeGiftVisibility(id, isPublic);
}

export async function createContribution(data: ContributionFormValues): Promise<void> {
  await ContributionsService.createContribution(data);
}
