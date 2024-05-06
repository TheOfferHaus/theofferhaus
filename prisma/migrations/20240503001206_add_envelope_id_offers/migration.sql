
-- AlterTable
ALTER TABLE "offers" ADD COLUMN     "envelopeId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "offers_envelopeId_key" ON "offers"("envelopeId");
