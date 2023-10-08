import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prismaClient } from "@/client";
import JWT from "jsonwebtoken";
import { z } from "zod";

// JWT SECRET
const JWT_SECRET = process.env.JWT_SECRET as string;

const serviceInput = z.object({
  title: z.string(),
  info: z.string(),
  imageUrl: z.string().optional(),
});

export async function POST(req: NextRequest) {
  const reqBody = await req.json();
  const cookie = cookies();

  try {
    const token = cookie.get("sparkle-admin-token");
    const verifiedToken = token && (await JWT.verify(token.value, JWT_SECRET));

    if (!token || !verifiedToken) {
      return NextResponse.json(
        {
          success: false,
          message: "you are not authorized",
          serviceData: null,
        },
        { status: 400 }
      );
    }

    // input type checking with zod
    const parsedInput = await serviceInput.safeParse(reqBody);

    if (!parsedInput.success) {
      return NextResponse.json(
        {
          success: false,
          message: parsedInput.error,
          serviceData: null,
        },
        { status: 422 }
      );
    }

    // fetching data from parsedInput
    const { title, info, imageUrl } = parsedInput.data;

    const service = await prismaClient.services.create({
      data: {
        title,
        info,
        imageUrl,
      },
    });

    return NextResponse.json({
      success: true,
      message: "added service successfully",
      serviceData: service,
    });
  } catch (e: any) {
    return NextResponse.json(
      {
        success: false,
        message: e.message,
        serviceData: null,
      },
      { status: 400 }
    );
  }
}
