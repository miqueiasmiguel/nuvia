import { prisma } from "@/lib/prisma";

import { PixType, WeddingList } from "../types";
import { WeddingSettingsFormValues } from "../validations";

export class WeddingListService {
  static async getWeddingListByUserId(userId: string): Promise<WeddingList> {
    const weddingList = await prisma.weddingList.findFirst({
      where: {
        user: {
          id: userId,
        },
      },
    });

    if (!weddingList) {
      throw new Error("Wedding list not found");
    }

    return {
      ...weddingList,
      weddingDate: weddingList.weddingDate ?? undefined,
      pixKey: weddingList.pixKey ?? undefined,
      pixType: weddingList.pixType as PixType,
      coverImage: weddingList.coverImage ?? undefined,
      message: weddingList.message ?? undefined,
      theme: weddingList.theme ?? undefined,
    };
  }

  static async createWeddingList(data: WeddingSettingsFormValues, userId: string) {
    return await prisma.weddingList.create({
      data: {
        ...data,
        weddingDate: data.weddingDate ? new Date(data.weddingDate) : undefined,
        slug: await this.generateSlug(`${data.brideName}-${data.groomName}`),
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  static async updateWeddingList(id: string, data: WeddingSettingsFormValues) {
    return await prisma.weddingList.update({
      where: {
        id,
      },
      data: {
        ...data,
        weddingDate: data.weddingDate ? new Date(data.weddingDate) : undefined,
      },
    });
  }

  private static async generateSlug(name: string): Promise<string> {
    const baseSlug = name
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");

    const slug = `${baseSlug}-${Date.now()}`;

    const existingSlug = await prisma.weddingList.findUnique({
      where: {
        slug,
      },
    });

    if (existingSlug) {
      return this.generateSlug(name);
    }

    return slug;
  }
}
