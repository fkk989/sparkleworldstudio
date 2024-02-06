import { prismaClient } from "@/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const service = await prismaClient.services.findUnique({
      where: { id: reqBody.id },
    });

    if (!service) {
      NextResponse.json(
        {
          success: true,
          message: "no project found",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "fetched  project successfully",
        service,
      },
      { status: 200 }
    );
  } catch (e: any) {
    return NextResponse.json(
      {
        success: true,
        message: e.message,
      },
      { status: 400 }
    );
  }
}
