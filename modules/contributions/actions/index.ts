"use server";

import { ContributionsService } from "../services/contributions.service";
import { Contribution } from "../types";

export async function getContributionsByWeddingListId(weddingListId: string): Promise<Contribution[]> {
  return await ContributionsService.getContributionsByWeddingListId(weddingListId);
}

export async function getContributionsByGiftId(giftId: string): Promise<Contribution[]> {
  return await ContributionsService.getContributionsByGiftId(giftId);
}
