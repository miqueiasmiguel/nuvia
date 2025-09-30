import { prisma } from "@/lib/prisma";

import { Gift } from "../types";
import { GiftFormValues } from "../validations";

export class GiftsService {
  static async getGiftsByWeddingListId(weddingListId: string): Promise<Gift[]> {
    const gifts = await prisma.gift.findMany({
      where: { weddingListId },
      include: {
        contributions: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return gifts.map((gift) => ({
      ...gift,
      isPublic: gift.isPublic,
      price: gift.price.toNumber(),
      giftedCount: gift.contributions.length,
      description: gift.description ?? "",
      image: gift.image ?? "",
      contributions: gift.contributions.map((contribution) => ({
        ...contribution,
        amount: contribution.amount.toNumber(),
      })),
    }));
  }

  static async getPublicGiftsByWeddingListId(weddingListId: string): Promise<Gift[]> {
    const gifts = await prisma.gift.findMany({
      where: { weddingListId, isPublic: true },
      include: {
        contributions: {
          where: {
            isPublic: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return gifts.map((gift) => ({
      ...gift,
      isPublic: gift.isPublic,
      price: gift.price.toNumber(),
      giftedCount: gift.contributions.length,
      description: gift.description ?? "",
      image: gift.image ?? "",
      contributions: gift.contributions.map((contribution) => ({
        ...contribution,
        amount: contribution.amount.toNumber(),
      })),
    }));
  }

  static async createGift(data: GiftFormValues, weddingListId: string): Promise<void> {
    await prisma.gift.create({
      data: {
        ...data,
        image: data.image?.toString(),
        weddingListId,
      },
    });
  }

  static async updateGift(id: string, data: GiftFormValues): Promise<void> {
    await prisma.gift.update({
      where: { id },
      data: {
        ...data,
        image: data.image?.toString(),
      },
    });
  }

  static async changeGiftVisibility(id: string, isPublic: boolean): Promise<boolean> {
    const gift = await prisma.gift.update({
      where: { id },
      data: { isPublic },
      select: {
        isPublic: true,
      },
    });

    return gift.isPublic;
  }
}
