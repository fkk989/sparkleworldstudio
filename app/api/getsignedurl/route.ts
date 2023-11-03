import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { cookies } from "next/headers";
import JWT from "jsonwebtoken";
import { z } from "zod";

interface JwtToken {
  email: string;
}

const AWS_S3_ACCESS_KEY = process.env.AWS_S3_ACCESS_KEY as string;
const AWS_S3_SECRET_KEY = process.env.AWS_S3_SECRET_KEY as string;

const s3Client = new S3Client({
  credentials: {
    accessKeyId: AWS_S3_ACCESS_KEY,
    secretAccessKey: AWS_S3_SECRET_KEY,
  },
  region: "ap-south-1",
});
// jwt secret
const JWT_SECRET = process.env.JWT_SECRET as string;

const input = z.object({
  imageType: z.string(),
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
          message: "admin token not found",
          url: null,
        },
        { status: 400 }
      );
    }

    const parsedInput = input.safeParse(reqBody);

    if (!parsedInput.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid input",
          url: null,
        },
        { status: 400 }
      );
    }

    //getting imageType from parsedInput
    const { imageType } = parsedInput.data;

    const putObjectCommand = new PutObjectCommand({
      Bucket: "sparkle-world-studio-production",
      Key: `uploads/${crypto.randomUUID()}.${imageType}`,
    });

    const signedUrl = await getSignedUrl(s3Client, putObjectCommand);

    return NextResponse.json({
      success: true,
      message: "got the signed url",
      url: signedUrl,
    });
  } catch (e: any) {
    return NextResponse.json(
      {
        success: false,
        message: e.message,
        url: null,
      },
      { status: 400 }
    );
  }
}
