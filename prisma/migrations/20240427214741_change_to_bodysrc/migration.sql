/*
  Warnings:

  - You are about to drop the column `bodyType` on the `Profile` table. All the data in the column will be lost.
  - Added the required column `bodySrc` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "bodyType",
ADD COLUMN     "bodySrc" TEXT NOT NULL;

-- DropEnum
DROP TYPE "bodyType";
