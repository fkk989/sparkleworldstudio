import { prismaClient } from "@/client";
import { cookies } from "next/headers";
import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import JWT from "jsonwebtoken";

// JWT SECRET
const JWT_SECRET = process.env.JWT_SECRET as string;

const serviceInput = z.object({
  id: z.string(),
  title: z.string(),
  info: z.string(),
  imageUrl: z.string().optional(),
});

export async function PUT(req: NextRequest) {
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
    const parsedInput = await serviceInput.safeParse(reqBody);

    if (!parsedInput.success) {
      return NextResponse.json(
        {
          success: false,
          message: "invalid input",
        },
        {
          status: 400,
        }
      );
    }

    const { id, title, info, imageUrl } = parsedInput.data;

    await prismaClient.services.update({
      where: { id: id },
      data: {
        title,
        info,
        imageUrl,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "service updated successfully",
      },
      {
        status: 200,
      }
    );
  } catch (e: any) {
    return NextResponse.json(
      {
        success: false,
        message: e.message,
      },
      {
        status: 400,
      }
    );
  }
}
