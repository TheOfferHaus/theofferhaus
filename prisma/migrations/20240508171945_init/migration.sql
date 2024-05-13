/*
  Warnings:

  - The primary key for the `offers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `offers` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[address]` on the table `properties` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address` to the `properties` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "offers" DROP CONSTRAINT "offers_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "offers_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "properties" ADD COLUMN     "address" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "properties_address_key" ON "properties"("address");
