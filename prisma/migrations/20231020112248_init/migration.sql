/*
  Warnings:

  - You are about to drop the `CheckAbaliability` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "CheckAbaliability";

-- CreateTable
CREATE TABLE "CheckAvaliable" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,

    CONSTRAINT "CheckAvaliable_pkey" PRIMARY KEY ("id")
);
