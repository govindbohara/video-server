/*
  Warnings:

  - You are about to drop the column `gameCategoryId` on the `EmbedVideo` table. All the data in the column will be lost.
  - You are about to drop the `GameCategory` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category` to the `EmbedVideo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "EmbedVideo" DROP CONSTRAINT "EmbedVideo_gameCategoryId_fkey";

-- AlterTable
ALTER TABLE "EmbedVideo" DROP COLUMN "gameCategoryId",
ADD COLUMN     "category" TEXT NOT NULL;

-- DropTable
DROP TABLE "GameCategory";
