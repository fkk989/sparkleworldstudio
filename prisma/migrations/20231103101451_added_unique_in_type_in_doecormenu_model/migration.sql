/*
  Warnings:

  - A unique constraint covering the columns `[type]` on the table `DecorMenu` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "DecorMenu_type_key" ON "DecorMenu"("type");
