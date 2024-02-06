import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import JWT from "jsonwebtoken";
import { prismaClient } from "@/client";

// JWT SECRET
const JWT_SECRET = process.env.JWT_SECRET as string;

const ideaInput = z.object({
  decorId: z.string(),
  title: z.string(),
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

    const parsedInput = await ideaInput.safeParse(reqBody);
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

    const { decorId, title, imageUrl, info } = parsedInput.data;

    const designIdea = await prismaClient.idea.create({
      data: {
        title,
        imageUrl,
        info,
        decor: { connect: { id: decorId } },
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "successfully added new design idea",
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
