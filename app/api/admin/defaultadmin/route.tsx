import { prismaClient } from "@/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

const email = process.env.DEFAULT_ADMIN_EMAIL as string;
const name = process.env.DEFAULT_ADMIN_NAME as string;
const password = process.env.DEFAULT_ADMIN_PASSWORD as string;

export async function GET() {
  try {
    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(password, salt);

    const admin = await prismaClient.admin.findUnique({ where: { email } });

    if (admin) {
      return NextResponse.json(
        {
          success: false,
          message: "Admin already exists",
          admin: null,
        },
        {
          status: 200,
        }
      );
    }

    const createdAdmin = await prismaClient.admin.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });
    return NextResponse.json(
      {
        success: true,
        message: "created default admin",
        admin: createdAdmin,
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
        admin: null,
      },
      {
        status: 200,
      }
    );
  }
}
