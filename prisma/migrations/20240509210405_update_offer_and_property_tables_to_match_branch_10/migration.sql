/*
  Warnings:

  - The primary key for the `properties` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `properties` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[typeformId]` on the table `offers` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `property_id` on the `offers` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "offers" DROP CONSTRAINT "offers_property_id_fkey";

-- AlterTable
ALTER TABLE "offers" ADD COLUMN     "typeformId" TEXT,
ALTER COLUMN "price" DROP NOT NULL,
DROP COLUMN "property_id",
ADD COLUMN     "property_id" UUID NOT NULL,
ALTER COLUMN "envelopeId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "properties" DROP CONSTRAINT "properties_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "properties_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "offers_typeformId_key" ON "offers"("typeformId");

-- AddForeignKey
ALTER TABLE "offers" ADD CONSTRAINT "offers_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
