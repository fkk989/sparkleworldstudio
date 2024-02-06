import { prismaClient } from "@/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const project = await prismaClient.project.findUnique({
      where: { id: reqBody.id },
    });

    if (!project) {
      NextResponse.json(
        {
          success: true,
          message: "no project found",
          project: null,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "fetched  project successfully",
        project: project,
      },
      { status: 200 }
    );
  } catch (e: any) {
    return NextResponse.json(
      {
        success: true,
        message: e.message,
        project: null,
      },
      { status: 400 }
    );
  }
}
