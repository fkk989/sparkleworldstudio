import { NextRequest, NextResponse } from "next/server";
import { prismaClient } from "@/client";
import emailValidator from "email-validator";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { z } from "zod";

// signup inputs
const signupInput = z.object({
  email: z.string(),
  name: z.string(),
  password: z.string(),
});

// function for post req this function will create a admin
export async function POST(req: NextRequest) {
  try {
    // getting reqBody
    const reqBody = await req.json();
    const cookie = cookies();

    const adminToken = cookie.get("sparkle-admin-token");

    if (!adminToken) {
      return NextResponse.json(
        {
          success: false,
          message: "you are not authorized",
          admin: null,
        },
        {
          status: 400,
        }
      );
    }

    // checking input types for type safety
    const parsedInput = signupInput.safeParse(reqBody);
    if (!parsedInput.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid input",
          admin: null,
        },
        {
          status: 422,
        }
      );
    }

    const { email, name, password } = parsedInput.data;

    // hashing password
    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(password, salt);

    // checking if Admin Already exists in db
    const adminInDb = await prismaClient.admin.findUnique({
      where: { email: email },
    });

    if (adminInDb) {
      return NextResponse.json(
        {
          success: false,
          message: "Admin already exists with this userName",
          admin: null,
        },
        {
          status: 400,
        }
      );
    }

    const validatedEmail = emailValidator.validate(email);

    if (!validatedEmail) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Email",
          admin: null,
        },
        {
          status: 422,
        }
      );
    }

    const createdAdmin = await prismaClient.admin.create({
      data: {
        email: email,
        name: name,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Admin created successfully",
        admin: createdAdmin,
      },
      {
        status: 200,
      }
    );

    // catching error
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
