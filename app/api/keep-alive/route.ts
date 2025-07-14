import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

const defaultRandomStringLength: number = 12;

const alphabetOffset: number = "a".charCodeAt(0);
const generateRandomString = (length: number = defaultRandomStringLength) => {
  let newString = "";

  for (let i = 0; i < length; i++) {
    newString += String.fromCharCode(alphabetOffset + Math.floor(Math.random() * 26));
  }

  return newString;
};

export async function GET() {
  try {
    const randomString = generateRandomString();
    const dbResponse = await prisma.keepAlive.findMany({
      where: {
        name: {
          equals: randomString,
        },
      },
    });
    const successMessage = dbResponse != null ? `Success - found ${dbResponse.length} entries` : "Fail";
    return NextResponse.json(successMessage);
  } catch (error) {
    console.error(error);
    return NextResponse.json("There was an error", { status: 401 });
  }
}
