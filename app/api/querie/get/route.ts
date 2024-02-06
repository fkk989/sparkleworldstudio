import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { prismaClient } from "@/client";
import JWT from "jsonwebtoken";

// JWT SECRET
const JWT_SECRET = process.env.JWT_SECRET as string;

// invalidating data for this route on each call
export const revalidate = 0;

export async function GET() {
  try {
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

    const queries = await prismaClient.query.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "successfully fetched all queries",
        queries,
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
