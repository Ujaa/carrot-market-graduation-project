/*
  Warnings:

  - You are about to drop the column `bodyShape` on the `Profile` table. All the data in the column will be lost.
  - Added the required column `bodyType` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eyeType` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "bodyType" AS ENUM ('TYPE_1', 'TYPE_2', 'TYPE_3', 'TYPE_4');

-- CreateEnum
CREATE TYPE "eyeType" AS ENUM ('NORMAL', 'HALF_CLOSED');

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "bodyShape",
ADD COLUMN     "bodyType" "bodyType" NOT NULL,
ADD COLUMN     "eyeType" "eyeType" NOT NULL;

-- DropEnum
DROP TYPE "BodyShape";
