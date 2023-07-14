/*
  Warnings:

  - You are about to drop the column `gameCategoryId` on the `EmbedVideo` table. All the data in the column will be lost.
  - You are about to drop the `GameCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "EmbedVideo" DROP CONSTRAINT "EmbedVideo_gameCategoryId_fkey";

-- AlterTable
ALTER TABLE "EmbedVideo" DROP COLUMN "gameCategoryId",
ALTER COLUMN "start_time" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "GameCategory";
