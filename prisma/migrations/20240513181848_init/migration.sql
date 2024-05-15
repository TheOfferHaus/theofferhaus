-- CreateEnum
CREATE TYPE "Status" AS ENUM ('REJECTED', 'ACCEPTED', 'PENDING');

-- CreateTable
CREATE TABLE "users" (
    "username" TEXT NOT NULL,
    "is_admin" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "stripe_id" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("username")
);

-- CreateTable
CREATE TABLE "offers" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "envelopeId" TEXT,
    "envelopeURL" TEXT,
    "typeformId" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "price" INTEGER,
    "buyer_id" TEXT NOT NULL,
    "property_id" UUID NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "offers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "properties" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "address" TEXT NOT NULL,

    CONSTRAINT "properties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "access_data" (
    "id" SERIAL NOT NULL,
    "base_uri" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "refresh_token" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "expiration_time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "access_data_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "offers_envelopeId_key" ON "offers"("envelopeId");

-- CreateIndex
CREATE UNIQUE INDEX "offers_envelopeURL_key" ON "offers"("envelopeURL");

-- CreateIndex
CREATE UNIQUE INDEX "offers_typeformId_key" ON "offers"("typeformId");

-- CreateIndex
CREATE UNIQUE INDEX "properties_address_key" ON "properties"("address");

-- AddForeignKey
ALTER TABLE "offers" ADD CONSTRAINT "offers_buyer_id_fkey" FOREIGN KEY ("buyer_id") REFERENCES "users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offers" ADD CONSTRAINT "offers_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
