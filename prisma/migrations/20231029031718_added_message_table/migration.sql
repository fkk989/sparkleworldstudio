/*
  Warnings:

  - Added the required column `name` to the `Query` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Query" ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "message" DROP NOT NULL;

-- CreateTable
CREATE TABLE "message" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" INTEGER NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "message_pkey" PRIMARY KEY ("id")
);
