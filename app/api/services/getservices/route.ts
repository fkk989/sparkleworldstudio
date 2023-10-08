import { prismaClient } from "@/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const services = await prismaClient.services.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(
      {
        success: true,
        message: "fetched all services successfully",
        services: services,
      },
      { status: 200 }
    );
  } catch (e: any) {
    NextResponse.json(
      {
        success: true,
        message: e.message,
        services: null,
      },
      { status: 400 }
    );
  }
}
