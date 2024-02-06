import { prismaClient } from "@/client";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import JWT from "jsonwebtoken";

// JWT SECRET
const JWT_SECRET = process.env.JWT_SECRET as string;

export async function DELETE(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const cookie = cookies();

    const id = reqBody.id;
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

    await prismaClient.idea.deleteMany({ where: { decor: { id } } });

    await prismaClient.decorMenu.delete({ where: { id: id } });

    return NextResponse.json(
      {
        success: true,
        message: "Decor Dleted Successfully",
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
