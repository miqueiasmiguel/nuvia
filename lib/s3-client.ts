import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export const r2Client = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_HOSTNAME!}`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

export async function uploadImage(imageFile: File | string): Promise<string> {
  if (typeof imageFile === "string") {
    return imageFile;
  }

  if (imageFile && imageFile.size !== 0) {
    const key = `${Date.now()}-${imageFile.name}`;

    try {
      const arrayBuffer = await imageFile.arrayBuffer();

      await r2Client.send(
        new PutObjectCommand({
          Bucket: "nuvia",
          Key: key,
          Body: Buffer.from(arrayBuffer),
          ContentType: imageFile.type,
        }),
      );

      return `${key}`;
    } catch (error) {
      console.error("Erro ao fazer upload da imagem:", error);
      throw new Error("Falha ao fazer upload da imagem");
    }
  }

  return "";
}

export const getImageUrl = (imageValue?: string) => {
  if (!imageValue || imageValue.trim() === "") {
    return null;
  }

  if (imageValue.startsWith("http")) {
    return imageValue;
  }

  if (imageValue && !imageValue.startsWith("data:")) {
    console.log("env", process.env.NEXT_PUBLIC_R2_PUBLIC_HOSTNAME);
    return `https://${process.env.NEXT_PUBLIC_R2_PUBLIC_HOSTNAME}/${imageValue}`;
  }

  return imageValue;
};
