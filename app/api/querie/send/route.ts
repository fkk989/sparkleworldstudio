import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { prismaClient } from "@/client";
const querieInput = z.object({
  name: z.string().min(5),
  email: z.string().min(5),
  phone: z.string().min(10),
  message: z.string().min(5),
});

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();

    const parsedInput = await querieInput.safeParse(reqBody);

    if (!parsedInput.success) {
      return NextResponse.json(
        {
          success: false,
          message: "invalid input",
        },
        {
          status: 422,
        }
      );
    }

    const { name, email, phone, message } = parsedInput.data;

    const query = await prismaClient.query.create({
      data: {
        name,
        email,
        phone,
        message,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "successfully send the querie",
      },
      {
        status: 200,
      }
    );
  } catch (e: any) {
    return NextResponse.json(
      {
        success: false,
        message: e.message,
      },
      {
        status: 400,
      }
    );
  }
}
