/*
  Warnings:

  - Made the column `clerk_id` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "clerk_id" SET NOT NULL;
