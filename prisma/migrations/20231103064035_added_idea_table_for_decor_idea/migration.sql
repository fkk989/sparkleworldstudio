-- CreateTable
CREATE TABLE "Idea" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "info" TEXT NOT NULL,
    "decorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Idea_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Idea" ADD CONSTRAINT "Idea_decorId_fkey" FOREIGN KEY ("decorId") REFERENCES "DecorMenu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
