import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prismaClient } from "@/client";
import JWT from "jsonwebtoken";
import { z } from "zod";

// JWT SECRET
const JWT_SECRET = process.env.JWT_SECRET as string;

const projectInput = z.object({
  title: z.string().min(5),
  clientName: z.string().min(5),
  info: z.string().optional(),
  landArea: z.string().optional(),
  budget: z.string().optional(),
  architect: z.string().optional(),
  imageUrl: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const cookie = cookies();

    const token = cookie.get("sparkle-admin-token");
    const verifiedToken = token && (await JWT.verify(token.value, JWT_SECRET));

    if (!token || !verifiedToken) {
      return NextResponse.json(
        {
          success: false,
          message: "you are not authorized",
          projectData: null,
        },
        { status: 400 }
      );
    }

    // input type checking with zod
    const parsedInput = await projectInput.safeParse(reqBody);

    if (!parsedInput.success) {
      return NextResponse.json(
        {
          success: false,
          message: parsedInput.error,
          projectData: null,
        },
        { status: 422 }
      );
    }

    // fetching data from parsedInput
    const { title, clientName, info, landArea, budget, architect, imageUrl } =
      parsedInput.data;

    const project = await prismaClient.project.create({
      data: {
        title,
        clientName,
        info,
        landArea,
        budget,
        architect,
        imageUrl,
      },
    });

    return NextResponse.json({
      success: true,
      message: "added project successfully",
      projectData: project,
    });
  } catch (e: any) {
    return NextResponse.json(
      {
        success: false,
        message: e.message,
        projectData: null,
      },
      { status: 400 }
    );
  }
}
