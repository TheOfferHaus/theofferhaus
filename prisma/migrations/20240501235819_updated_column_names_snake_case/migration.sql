/*
  Warnings:

  - You are about to drop the column `buyerId` on the `offers` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `offers` table. All the data in the column will be lost.
  - You are about to drop the column `propertyId` on the `offers` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `offers` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `isAdmin` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `stripeId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `users` table. All the data in the column will be lost.
  - Added the required column `buyer_id` to the `offers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `property_id` to the `offers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `offers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "offers" DROP CONSTRAINT "offers_buyerId_fkey";

-- DropForeignKey
ALTER TABLE "offers" DROP CONSTRAINT "offers_propertyId_fkey";

-- AlterTable
ALTER TABLE "offers" DROP COLUMN "buyerId",
DROP COLUMN "createdAt",
DROP COLUMN "propertyId",
DROP COLUMN "updatedAt",
ADD COLUMN     "buyer_id" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "property_id" INTEGER NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "createdAt",
DROP COLUMN "isAdmin",
DROP COLUMN "stripeId",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "is_admin" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "stripe_id" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "offers" ADD CONSTRAINT "offers_buyer_id_fkey" FOREIGN KEY ("buyer_id") REFERENCES "users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offers" ADD CONSTRAINT "offers_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
