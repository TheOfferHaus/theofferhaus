-- AlterTable
ALTER TABLE "offers" ADD COLUMN     "quizSubmitted" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "price" DROP NOT NULL,
ALTER COLUMN "envelopeId" DROP NOT NULL,
ALTER COLUMN "typeformId" DROP NOT NULL;
