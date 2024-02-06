import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import JWT from "jsonwebtoken";
import { AdminToken } from "@/store";
import { prismaClient } from "@/client";

// JWT SECRET
const JWT_SECRET = process.env.JWT_SECRET as string;
export async function GET() {
  try {
    const cookie = cookies();
    const token = cookie.get("sparkle-admin-token");

    // if not token found
    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "login again",
          admin: null,
        },
        {
          status: 400,
        }
      );
    }

    // verifing token
    const adminToken = (await JWT.verify(
      token.value,
      JWT_SECRET
    )) as AdminToken;
    const { email } = adminToken;

    if (!adminToken || !email) {
      return NextResponse.json(
        {
          success: false,
          message: "not authorized",
          admin: null,
        },
        {
          status: 400,
        }
      );
    }

    const admin = await prismaClient.admin.findUnique({
      where: { email: email },
    });
    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message: "No Admin found",
          admin: null,
        },
        {
          status: 400,
        }
      );
    }

    // res if every check pass
    return NextResponse.json(
      {
        success: true,
        message: "successfully fetched admin ",
        admin: admin,
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
        status: 400,
      }
    );
  }
}
