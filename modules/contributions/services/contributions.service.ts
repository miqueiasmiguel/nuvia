import { prisma } from "@/lib/prisma";

import { Contribution } from "../types";
import { ContributionFormValues } from "../validations";

export class ContributionsService {
  static async getContributionsByWeddingListId(weddingListId: string): Promise<Contribution[]> {
    const contributions = await prisma.contribution.findMany({
      where: {
        gift: {
          weddingListId: weddingListId,
        },
      },
      include: {
        gift: true,
      },
    });

    return contributions.map((contribution) => ({
      ...contribution,
      phone: contribution.phone ?? "",
      amount: contribution.amount.toNumber(),
      message: contribution.message ?? "",
      giftName: contribution.gift.name,
    }));
  }

  static async getContributionsByGiftId(giftId: string): Promise<Contribution[]> {
    const contributions = await prisma.contribution.findMany({
      where: {
        gift: {
          id: giftId,
        },
        isPublic: true,
      },
      select: {
        id: true,
        name: true,
        phone: true,
        amount: true,
        message: true,
        isPublic: true,
        createdAt: true,
        gift: {
          select: {
            name: true,
          },
        },
      },
    });

    return contributions.map((contribution) => ({
      ...contribution,
      phone: contribution.phone ?? "",
      amount: contribution.amount.toNumber(),
      message: contribution.message ?? "",
      giftName: contribution.gift.name,
    }));
  }

  static async createContribution(data: ContributionFormValues): Promise<void> {
    await prisma.contribution.create({
      data: {
        ...data,
      },
    });
  }
}
