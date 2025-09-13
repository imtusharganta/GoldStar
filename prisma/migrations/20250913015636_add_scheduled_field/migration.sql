-- AlterTable
ALTER TABLE "public"."Interview" ADD COLUMN     "scheduled" TIMESTAMP(3),
ALTER COLUMN "dueDate" DROP NOT NULL;
