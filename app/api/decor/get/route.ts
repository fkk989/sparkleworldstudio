import { NextResponse } from "next/server";
import { prismaClient } from "@/client";

// invalidating data for this route on each call
export const revalidate = 0;

export async function GET() {
  try {
    const decorMenu = await prismaClient.decorMenu.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "successfully fetched all decor menu",
        decorMenu,
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
