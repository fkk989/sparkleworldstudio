/*
  Warnings:

  - A unique constraint covering the columns `[type]` on the table `DecorType` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "DecorType_type_key" ON "DecorType"("type");
