import { prisma } from "@/lib/prisma";
import { r2Client } from "@/lib/s3-client";
import { PutObjectCommand } from "@aws-sdk/client-s3";

async function migrateImages() {
  const gifts = await prisma.gift.findMany();
  const weddingLists = await prisma.weddingList.findMany();

  for (const gift of gifts) {
    console.log(`Migrando imagem do presente: ${gift.name}`);

    if (!gift.image) {
      continue;
    }

    const base64Data = gift.image.split(",")[1];
    const imageBuffer = Buffer.from(base64Data, "base64");

    const key = `${Date.now()}-${gift.id}.png`;

    await r2Client.send(
      new PutObjectCommand({
        Bucket: "nuvia",
        Key: key,
        Body: imageBuffer,
        ContentType: "image/png",
      }),
    );

    await prisma.gift.update({
      where: { id: gift.id },
      data: { image: key },
    });

    console.log(`Imagem migrada: ${gift.name}`);
  }

  for (const list of weddingLists) {
    console.log(`Migrando imagem da lista de: ${list.brideName}`);

    if (!list.coverImage) {
      continue;
    }

    const base64Data = list.coverImage.split(",")[1];
    const imageBuffer = Buffer.from(base64Data, "base64");

    const key = `${Date.now()}-${list.id}.png`;

    await r2Client.send(
      new PutObjectCommand({
        Bucket: "nuvia",
        Key: key,
        Body: imageBuffer,
        ContentType: "image/png",
      }),
    );

    await prisma.weddingList.update({
      where: { id: list.id },
      data: { coverImage: key },
    });

    console.log(`Imagem migrada: ${list.brideName}`);
  }

  console.log("Migração concluída!");
}

migrateImages().catch((error) => {
  console.error("Erro na migração:", error);
  process.exit(1);
});
