/*
  Warnings:

  - You are about to drop the `Qeury` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `Query` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Query" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "phone" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "Qeury";
