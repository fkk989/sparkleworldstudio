import { prismaClient } from "@/client";
import { NextResponse } from "next/server";

export async function GET() {
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
