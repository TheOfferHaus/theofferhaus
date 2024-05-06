/*
  Warnings:

  - A unique constraint covering the columns `[envelopeId]` on the table `offers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[typeformId]` on the table `offers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `envelopeId` to the `offers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeformId` to the `offers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "offers" ADD COLUMN     "envelopeId" TEXT NOT NULL,
ADD COLUMN     "typeformId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "offers_envelopeId_key" ON "offers"("envelopeId");

-- CreateIndex
CREATE UNIQUE INDEX "offers_typeformId_key" ON "offers"("typeformId");
