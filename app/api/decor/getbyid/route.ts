import { NextRequest, NextResponse } from "next/server";
import { prismaClient } from "@/client";

export async function POST(req: NextRequest) {
  try {
    const { id } = (await req.json()) as { id: string };
    const decorMenu = await prismaClient.decorMenu.findUnique({
      where: { id },
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
