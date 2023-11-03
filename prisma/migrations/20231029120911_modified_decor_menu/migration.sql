/*
  Warnings:

  - Added the required column `type` to the `DecorMenu` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DecorMenu" ADD COLUMN     "type" TEXT NOT NULL;
