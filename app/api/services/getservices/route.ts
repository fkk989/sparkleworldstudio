import { prismaClient } from "@/client";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const header = headers();
  header.set("cache-control", "no-store");
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
