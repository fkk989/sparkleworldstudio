import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import JWT from "jsonwebtoken";
import { prismaClient } from "@/client";

// JWT SECRET
const JWT_SECRET = process.env.JWT_SECRET as string;

const decorInput = z.object({
  title: z.string().min(5),
  type: z.string(),
  imageUrl: z.string(),
  info: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const cookie = cookies();
    const token = cookie.get("sparkle-admin-token");

    const verifiedToken = token && (await JWT.verify(token.value, JWT_SECRET));

    if (!token || !verifiedToken) {
      return NextResponse.json(
        {
          success: false,
          message: "you are not authorized",
        },
        { status: 400 }
      );
    }

    const parsedInput = await decorInput.safeParse(reqBody);
    if (!parsedInput.success) {
      return NextResponse.json(
        {
          success: false,
          message: "invalid input",
        },
        {
          status: 422,
        }
      );
    }

    const { title, imageUrl, type, info } = parsedInput.data;

    const deocrAlreadyInDb = await prismaClient.decorMenu.findUnique({
      where: { type },
    });

    if (deocrAlreadyInDb) {
      return NextResponse.json(
        {
          success: false,
          message: "decor already present",
        },
        { status: 400 }
      );
    }

    await prismaClient.decorMenu.create({
      data: {
        title,
        imageUrl,
        type,
        info,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "successfully added new decor",
      },
      { status: 200 }
    );
  } catch (e: any) {
    return NextResponse.json(
      {
        success: false,
        message: e.message,
      },
      { status: 400 }
    );
  }
}
