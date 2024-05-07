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
