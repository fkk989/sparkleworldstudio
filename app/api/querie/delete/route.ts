import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import JWT from "jsonwebtoken";
import { prismaClient } from "@/client";

// JWT SECRET
const JWT_SECRET = process.env.JWT_SECRET as string;

const deleteQueryInput = z.object({
  id: z.string(),
});

export async function DELETE(req: NextRequest) {
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

    const parsedInput = await deleteQueryInput.safeParse(reqBody);

    if (!parsedInput.success) {
      return NextResponse.json(
        {
          success: false,
          message: "invalid id",
        },
        { status: 400 }
      );
    }

    const { id } = parsedInput.data;

    await prismaClient.query.delete({ where: { id } });

    return NextResponse.json(
      {
        success: true,
        message: "deleted successfully",
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
