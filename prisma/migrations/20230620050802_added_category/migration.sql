/*
  Warnings:

  - You are about to drop the column `category` on the `EmbedVideo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "EmbedVideo" DROP COLUMN "category",
ADD COLUMN     "gameCategoryId" TEXT;

-- CreateTable
CREATE TABLE "GameCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GameCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GameCategory_name_key" ON "GameCategory"("name");

-- AddForeignKey
ALTER TABLE "EmbedVideo" ADD CONSTRAINT "EmbedVideo_gameCategoryId_fkey" FOREIGN KEY ("gameCategoryId") REFERENCES "GameCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
