import { NextRequest, NextResponse } from "next/server";
import { prismaClient } from "@/client";

export async function POST(req: NextRequest) {
  try {
    const { type } = (await req.json()) as { type: string };
    const designIdeas = await prismaClient.idea.findMany({
      where: { decor: { type } },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "successfully fetched all design idea",
        designIdeas,
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
