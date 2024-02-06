/*
  Warnings:

  - Added the required column `info` to the `DecorMenu` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DecorMenu" ADD COLUMN     "info" TEXT NOT NULL;
