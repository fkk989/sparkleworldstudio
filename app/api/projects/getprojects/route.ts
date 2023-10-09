import { prismaClient } from "@/client";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
export async function GET() {
  const header = headers();
  header.set("cache-control", "no-store");
  try {
    const projects = await prismaClient.project.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(
      {
        success: true,
        message: "fetched all projects successfully",
        projects: projects,
      },
      { status: 200 }
    );
  } catch (e: any) {
    NextResponse.json(
      {
        success: true,
        message: e.message,
        projects: null,
      },
      { status: 400 }
    );
  }
}
