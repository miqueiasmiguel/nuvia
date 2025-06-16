import { prisma } from "@/lib/prisma";

import { WeddingSettingsFormValues } from "./wedding-list.validations";

export class WeddingListService {
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
