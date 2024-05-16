/*
  Warnings:

  - You are about to drop the column `envelopeURL` on the `offers` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "offers_envelopeURL_key";

-- AlterTable
ALTER TABLE "offers" DROP COLUMN "envelopeURL";
